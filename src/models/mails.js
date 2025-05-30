let idCounter = 0 //counts the mails
const mails = []

const getAllMails = () => {
    return mails
        .slice()
        .sort((a, b) => b.time - a.time)
        .slice(0, 50);
}

const sendMail = async (title, content, sender, receiver) => {
  const time = Date.now();

  const extractUrls = (text) => {
    const regex = /((?:(https?|ftp):\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(:\d+)?(\/[^\s]*)?)/gi;
    return text.match(regex) || [];
  };

  const urlsToCheck = [...extractUrls(title), ...extractUrls(content)];

  for (const url of urlsToCheck) {
    const blacklisted = await isUrlBlacklisted(url);
    if (blacklisted) {
      throw new Error(`Cannot send mail. Blacklisted URL detected: ${url}`);
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
  };

  const received = {
    ...sent,
    id: idCounter++,
    folder: 'inbox',
  };

  mails.push(sent);
  mails.push(received);

  return sent;
}


const getMailById = (id) => mails.find(m => m.id === id)

const updateMail = (id, title, content) => {
    const mail = mails.find(m => m.id === id)
    if(!mail) return null
    if(title) mail.title = title
    if(content) mail.content = content
    return mail
}

const deleteMail = (id) => {
    const index = mails.findIndex(m => m.id === id)
    if(index === -1) return false
    mails.splice(index, 1)
    return true  
}

const searchMails = (query) => {
  const lowerQuery = query.toLowerCase();
  return mails.filter(mail =>
    mail.title.toLowerCase().includes(lowerQuery) ||
    mail.content.toLowerCase().includes(lowerQuery) ||
    mail.sender.toLowerCase().includes(lowerQuery) ||
    mail.receiver.toLowerCase().includes(lowerQuery)
  );
}
  
module.exports = {getAllMails, sendMail, getMailById, updateMail, deleteMail, searchMails}