let idCounter = 0 //counts the mails
const mails = []

const { isBlacklisted } = require('./blacklist');

const getAllMailsForUser = (userId) => {
  return mails
    .filter(m => (m.sender === userId && m.folder === 'sent')|| (m.receiver === userId && m.folder === 'inbox'))
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
    if(index === -1) return false
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


module.exports = {getAllMailsForUser, sendMail, getMailById, updateMail, deleteMail, searchMails,updateIsRead}