const mailModel = require('./mails');
let labelCounter = 0
const labels = []

const getAllLabelsForUser = (userId) => {
  return labels.filter(l => l.userId === userId);
};

const createLabel = (name, userId) => {
    const newLabel = { id: ++labelCounter, name, userId}
    labels.push(newLabel)
    return newLabel
}

const getLabelById = (id) => labels.find(l => l.id === id)

const updateLabel = (id, name) => {
    const label = labels.find(l => l.id === id)
    if (!label) return null
    label.name = name
    return label
}

const deleteLabel = (id) => {
    const index = labels.findIndex(l => l.id === id)
    if (index === -1) return false
    labels.splice(index, 1)
    return true
}
const addLabelToMail = (mailId, labelId) => {
  console.log(`addLabelToMail called with mailId=${mailId}, labelId=${labelId}`);
  const mail = mailModel.getMailById(mailId);
  if (!mail) {
    console.log('Mail not found');
    return null;
  }
  if (!mail.labels) mail.labels = [];
  if (!mail.labels.includes(labelId)) {
    mail.labels.push(labelId);
  }
  return mail;
};


const removeLabelFromMail = (mailId, labelId) => {
  const mail = mailModel.getMailById(mailId);
  if (!mail) return null;
  mail.labels = mail.labels.filter(id => id !== labelId);
  return mail;
};


module.exports = {getAllLabelsForUser, createLabel, getLabelById, updateLabel, deleteLabel, addLabelToMail, removeLabelFromMail}