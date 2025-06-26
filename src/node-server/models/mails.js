let idCounter = 0 //counts the mails
const mails = []

const { isBlacklisted } = require('./blacklist');
const { add, remove } = require('./blacklist');
const userModel = require('./users');

const extractUrls = (text) => {
  const regex = /((?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?)/gi;
  return text.match(regex) || [];
};

const markMailAsSpam = async (id, userId) => {
  const mail = mails.find(m => m.id === parseInt(id));
  if (mail && mail.receiver === userId && !mail.isSpam) {
    mail.isSpam = true;
    const urls = [...extractUrls(mail.title), ...extractUrls(mail.content)];
    for (const url of urls) {
      await add(url);
    }
    return true;
  }
  return false;
};

const unmarkMailAsSpam = async (id, userId) => {
  const mail = mails.find(m => m.id === parseInt(id));
  if (mail && mail.receiver === userId && mail.isSpam) {
    mail.isSpam = false;
    const urls = [...extractUrls(mail.title), ...extractUrls(mail.content)];
    for (const url of urls) {
      await remove(url);
    }
    return true;
  }
  return false;
};

const getAllMailsForUser = (userId, filters = {}) => {
  let userMails = mails.filter(m => {
    const isSender = m.sender === userId && m.folder === 'sent';
    const isReceiver = m.receiver === userId && m.folder !== 'sent';
    return isSender || isReceiver;
  });

  if (filters.folder) {
    userMails = userMails.filter(m => m.folder === filters.folder);
  }

  if (filters.labelId !== undefined) {
    userMails = userMails.filter(m => m.labels.includes(filters.labelId));
  }

  if (filters.isSpam !== undefined) {
    userMails = userMails.filter(m => m.isSpam === filters.isSpam);
  } else {
    userMails = userMails.filter(m => m.isSpam !== true);
  }

  if (filters.isFavorite !== undefined) {
    userMails = userMails.filter(m => m.isFavorite === filters.isFavorite);
  }

  if (filters.sender !== undefined) {
    const from = userModel.getUserByUsername(filters.sender);
    if (!from) return [];
    userMails = userMails.filter(m => Number(m.sender) === Number(from.id));
  }

  if (filters.receiver !== undefined) {
    const to = userModel.getUserByUsername(filters.receiver);
    if (!to) return [];
    userMails = userMails.filter(m => Number(m.receiver) === Number(to.id));
  }

  if (filters.startDate && filters.endDate) {
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    userMails = userMails.filter(m => {
      const mailDate = new Date(m.time);
      return mailDate >= start && mailDate <= end;
    });
  }

  if (filters.subject) {
    userMails = userMails.filter(m => m.title === filters.subject);
  }

  if (filters.includes) {
    userMails = userMails.filter(m => m.content.includes(filters.includes));
  }

  if (filters.excludes) {
    userMails = userMails.filter(m => !m.content.includes(filters.excludes));
  }

  return userMails.sort((a, b) => b.time - a.time);
};


const getSpamMailsForUser = (userId) => {
  return mails
    .filter(m => m.receiver === userId && m.isSpam === true)
    .sort((a, b) => b.time - a.time)
    .slice(0, 50);
};


const fs = require('fs');
const path = require('path');

const sendMail = async (title, content, sender, receiver, attachments = []) => {
  const time = Date.now();

  const extractUrls = (text) => {
    const regex = /((?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?)/gi;
    return text.match(regex) || [];
  };

  const urlsToCheck = [...extractUrls(title), ...extractUrls(content)];

  let isSpam = false;
  for (const url of urlsToCheck) {
    if (await isBlacklisted(url)) {
      isSpam = true;
      break;
    }
  }

  const processedAttachments = attachments.map(file => {
  if (!file.buffer) {
    return {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      storedFilename: file.storedFilename,
    };
  }

  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2)}-${file.originalname}`;
  const uploadPath = path.join(__dirname, '..', 'uploads', uniqueName);
  fs.writeFileSync(uploadPath, file.buffer);

  return {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    storedFilename: uniqueName,
  };
});

  const sent = {
    id: idCounter++,
    sender,
    receiver,
    title,
    content,
    time,
    folder: 'sent',
    isRead: false,
    isFavorite: false,
    isSpam: isSpam,
    labels: [],
    attachments: processedAttachments, 
  };

  const received = {
    ...sent,
    id: idCounter++,
    folder: 'inbox',
  };

  mails.push(sent);
  mails.push(received);

  return sent;
};


const getMailById = (id) => mails.find(m => m.id === id)

const updateMail = async (id, title, content) => {
  const mail = mails.find(m => m.id === id);
  if (!mail) return null;

  const extractUrls = (text) => {
    const regex = /((?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?)/gi;
    return text ? text.match(regex) || [] : [];
  };

  const urlsToCheck = [...extractUrls(title), ...extractUrls(content)];

  for (const url of urlsToCheck) {
    const blacklisted = await isBlacklisted(url);
    if (blacklisted) {
      return null;
    }
  }

  if (title) mail.title = title;
  if (content) mail.content = content;
  return mail;
};

const deleteMail = (id) => {
  const index = mails.findIndex(m => m.id === id)
  if (index === -1) return false
  mails.splice(index, 1)
  return true
}

const searchMails = (query, userId, labelId = null) => {
  const lowerQuery = query.toLowerCase();

  return mails.filter(mail => {
    const senderStr = String(mail.sender);
    const receiverStr = String(mail.receiver);

    const matchesText =
      mail.title.toLowerCase().includes(lowerQuery) ||
      mail.content.toLowerCase().includes(lowerQuery) ||
      senderStr.toLowerCase().includes(lowerQuery) ||
      receiverStr.toLowerCase().includes(lowerQuery);

    const isOwnedByUser =
      (mail.sender === userId && mail.folder === 'sent') ||
      (mail.receiver === userId && mail.folder === 'inbox');

    const hasLabel = labelId ? mail.labels.includes(labelId) : true;

    return matchesText && isOwnedByUser && hasLabel;
  });
};

const updateIsRead = (mailId, isRead) => {
  const mail = mails.find(m => m.id === mailId);
  if (!mail) return null;
  mail.isRead = isRead;
  return mail;
};

const markAsFavorite = (id, userId) => {
  const mail = mails.find(m => m.id === parseInt(id));
  if (mail && (mail.receiver === userId || mail.sender === userId)) {
    mail.isFavorite = true;
    return true;
  }
  return false;
};

const unmarkAsFavorite = (id, userId) => {
  const mail = mails.find(m => m.id === parseInt(id));
  if (mail && (mail.receiver === userId || mail.sender === userId)) {
    mail.isFavorite = false;
    return true;
  }
  return false;
};

const getAllMailsForLabel = (userId, labelId, filters = {}) => {
  if (labelId === undefined || labelId === null) return [];

  let userMails = mails.filter(m => {
    const isSender = m.sender === userId;
    const isReceiver = m.receiver === userId;

    if (filters.folder) {
      return (isSender || isReceiver) && m.folder === filters.folder;
    }

    return (isSender && m.folder === 'sent') || (isReceiver && m.folder !== 'sent');
  });

  userMails = userMails.filter(m => m.labels.includes(labelId));

  if (filters.isSpam !== undefined) {
    userMails = userMails.filter(m => m.isSpam === filters.isSpam);
  } else {
    userMails = userMails.filter(m => m.isSpam !== true);
  }

  if (filters.isFavorite !== undefined) {
    userMails = userMails.filter(m => m.isFavorite === filters.isFavorite);
  }

  if (filters.sender !== undefined) {
    const from = userModel.getUserByUsername(filters.sender);
    if (!from) return [];
    userMails = userMails.filter(m => Number(m.sender) === Number(from.id));
  }

  if (filters.receiver !== undefined) {
    const to = userModel.getUserByUsername(filters.receiver);
    if (!to) return [];
    userMails = userMails.filter(m => Number(m.receiver) === Number(to.id));
  }

  if (filters.startDate && filters.endDate) {
    const start = new Date(filters.startDate);
    const end = new Date(filters.endDate);
    userMails = userMails.filter(m => {
      const mailDate = new Date(m.time);
      return mailDate >= start && mailDate <= end;
    });
  }

  if (filters.subject) {
    userMails = userMails.filter(m => m.title === filters.subject);
  }

  if (filters.includes) {
    userMails = userMails.filter(m => m.content.includes(filters.includes));
  }

  if (filters.excludes) {
    userMails = userMails.filter(m => !m.content.includes(filters.excludes));
  }

  return userMails.sort((a, b) => b.time - a.time);
};

module.exports = { markAsFavorite, unmarkAsFavorite, getAllMailsForUser, getSpamMailsForUser, markMailAsSpam, unmarkMailAsSpam, sendMail, getMailById, updateMail, deleteMail, searchMails, updateIsRead, getAllMailsForLabel }
