let idCounter = 0 //counts the mails
const mails = []

const { isBlacklisted } = require('./blacklist');
const { add, remove } = require('./blacklist');

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

  if (filters.sender) {
    userMails = userMails.filter(m => m.sender === filters.sender);
  }

  if (filters.date) {
    userMails = userMails.filter(m => new Date(m.time).toDateString() === new Date(filters.date).toDateString());
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

  return userMails.sort((a, b) => b.time - a.time).slice(0, 50);
};

const getSpamMailsForUser = (userId) => {
  return mails
    .filter(m => m.receiver === userId && m.isSpam === true)
    .sort((a, b) => b.time - a.time)
    .slice(0, 50);
};


const sendMail = async (title, content, sender, receiver) => {
  const time = Date.now();

  const extractUrls = (text) => {
    const regex = /((?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?)/gi;
    return text.match(regex) || [];
  };

  const urlsToCheck = [...extractUrls(title), ...extractUrls(content)];

  for (const url of urlsToCheck) {
    const blacklisted = await isBlacklisted(url);
    if (blacklisted) {
      return null;
    }
  }

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
    labels: [] // assign mail to lables
  };

  const received = {
    ...sent,
    id: idCounter++,
    folder: 'inbox',
    isRead: false,
    labels: [], // assign mail to lables
  };

  mails.push(sent);
  mails.push(received);

  return sent;
}


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
    const matchesText =
      mail.title.toLowerCase().includes(lowerQuery) ||
      mail.content.toLowerCase().includes(lowerQuery) ||
      mail.sender.toLowerCase().includes(lowerQuery) ||
      mail.receiver.toLowerCase().includes(lowerQuery);

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

module.exports = { markAsFavorite, unmarkAsFavorite, getAllMailsForUser, getSpamMailsForUser, markMailAsSpam, unmarkMailAsSpam, sendMail, getMailById, updateMail, deleteMail, searchMails, updateIsRead }