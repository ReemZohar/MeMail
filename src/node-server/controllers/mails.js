const mailModel = require('../models/mails'); // mail holds the in-memory model
const userModel = require('../models/users');

function authorizeOwnership(resource, userId, res) {
  if (resource.userId !== userId) {
    res.status(403).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}


// Get the 50 most recent mails (sorted by time, newest first)
exports.getAllMails = (req, res) => {
  const userId = req.user.id;
  const user = userModel.getUserById(userId);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const { folder, isSpam, isFavorite, sender, date, labelId } = req.query;

  const filters = {
    folder,
    sender,
    date,
    labelId: labelId ? Number(labelId) : undefined,
    isSpam: isSpam === 'true' ? true : isSpam === 'false' ? false : undefined,
    isFavorite: isFavorite === 'true' ? true : isFavorite === 'false' ? false : undefined
  };

  const mails = mailModel.getAllMailsForUser(userId, filters);
  res.status(200).json(mails);
};

// Send a new mail
exports.sendMail = async (req, res) => {

  const { title, content, receiver, draftId } = req.body;
  const sender = req.user.id;

  if (!title || !content || !receiver) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const senderUser = userModel.getUserById(sender);
  const receiverUser = userModel.getUserByUsername(receiver);
  if (!senderUser || !receiverUser) {
    return res.status(404).json({ error: 'Sender or receiver not found' });
  }

  const mail = await mailModel.sendMail(title, content, senderUser.id, receiverUser.id);
  if (!mail) {
    return res.status(400).json({ error: 'Mail contains blacklisted URL' });
  }

  // delete the draft if exist
  if (draftId) {
    const draftModel = require('../models/draft');
    draftModel.deleteDraft(draftId, senderUser.id);
  }

  res.status(201).location(`/api/mails/${mail.id}`).json(mail);
};

// Get a specific mail by its ID
exports.getMailById = (req, res) => {
  const id = parseInt(req.params.id);
  const mail = mailModel.getMailById(id);

    if (!mail) {
        return res.status(404).json({ error: 'Mail not found\n' }); // HTTP 404 Not Found
    }

    if (mail.sender !== req.user.id && mail.receiver !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
    }

  res.status(200).json(mail); // HTTP 200 OK
};

// Get a specific mail with all his fields by its ID
exports.getEnhancedMailById = (req, res) => {
  const id = parseInt(req.params.id);
  const mail = mailModel.getMailById(id);

  if (!mail) {
    return res.status(404).json({ error: 'Mail not found' });
  }

  if (mail.sender !== req.user.id && mail.receiver !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const senderUser = userModel.getUserById(mail.sender);
  const receiverUser = userModel.getUserById(mail.receiver);

  const enrichedMail = {
    ...mail,
    senderEmail: senderUser ? senderUser.username : null,
    receiverEmail: receiverUser ? receiverUser.username : null,
    senderName: senderUser ? senderUser.name : null,
    receiverName: receiverUser ? receiverUser.name : null,
  };

  res.status(200).json(enrichedMail);
};


// Update an existing mail by ID (partial update for title/content)
exports.updateMail = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const mail = mailModel.getMailById(id);
  if (!mail) {
    return res.status(404).json({ error: 'Mail not found' });
  }

  if (mail.sender !== req.user.id && mail.receiver !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const updated = await mailModel.updateMail(id, title, content);
  if (!updated) {
    return res.status(400).json({ error: 'Mail update failed or blacklisted URL' });
  }

  res.status(204).send();
};

// Delete a mail by ID
exports.deleteMail = (req, res) => {
  const id = Number(req.params.id);
  const mail = mailModel.getMailById(id);
  if (!mail) return res.status(404).json({ error: 'Mail not found' });

  if (mail.sender !== req.user.id && mail.receiver !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  const success = mailModel.deleteMail(id, req.user.id);
  if (!success) return res.status(400).json({ error: 'Could not delete mail' });

  res.status(204).send();
};

// Search mails by query (matches title, content, sender or receiver)
exports.searchMails = (req, res) => {
  const userId = req.user.id; // instead req.header("user-id") to get it from JWT
  const labelId = req.query.labelId ? Number(req.query.labelId) : null;

  const user = userModel.getUserById(userId);

  if (!user) return res.status(404).json({ error: 'User not found' });
  const query = req.params.query;
  const results = mailModel.searchMails(query, userId);
  res.status(200).json(results); // HTTP 200 OK
};

exports.updateIsReadStatus = (req, res) => {
  const mailId = Number(req.params.id);
  const { isRead } = req.body;

  if (typeof isRead !== 'boolean') {
    return res.status(400).json({ error: 'isRead must be a boolean' });
  }

  const mail = mailModel.getMailById(mailId);
  if (!mail) {
    return res.status(404).json({ error: 'Mail not found' });
  }

  if (mail.sender !== req.user.id && mail.receiver !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to update this mail' });
  }

  const updated = mailModel.updateIsRead(mailId, isRead);
  const { password, ...safeMail } = updated;
  res.status(200).json(safeMail);
};

exports.markAsSpam = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = await mailModel.markMailAsSpam(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail marked as spam and URLs blacklisted." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};

exports.unmarkAsSpam = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = await mailModel.unmarkMailAsSpam(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail unmarked as spam and URLs removed from blacklist." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};

exports.markAsFavorite = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = mailModel.markAsFavorite(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail marked as favorite." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};

exports.unmarkAsFavorite = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = mailModel.unmarkAsFavorite(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail unmarked as favorite." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};

exports.getAdvancedMails = (req, res) => {
  const userId = req.user.id;
  const user = userModel.getUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const {
    folder,
    isSpam,
    isFavorite,
    sender,
    subject,
    includes,
    excludes,
    dateRange 
  } = req.query;

  let startDate, endDate;
  if (dateRange) {
    [startDate, endDate] = dateRange.split(',').map(d => new Date(d));
  }

  const filters = {
    folder,
    isSpam: isSpam === 'true' ? true : isSpam === 'false' ? false : undefined,
    isFavorite: isFavorite === 'true' ? true : isFavorite === 'false' ? false : undefined,
    sender: sender ? Number(sender) : undefined,
    subject,
    includes,
    excludes,
    startDate,
    endDate
  };

  const mails = mailModel.getAllMailsForUser(userId, filters);
  res.status(200).json(mails);
};


exports.updateIsReadStatus = (req, res) => {
  const mailId = Number(req.params.id);
  const { isRead } = req.body;

  if (typeof isRead !== 'boolean') {
    return res.status(400).json({ error: 'isRead must be a boolean' });
  }

  const mail = mailModel.getMailById(mailId);
  if (!mail) {
    return res.status(404).json({ error: 'Mail not found' });
  }

  if (mail.sender !== req.user.id && mail.receiver !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to update this mail' });
  }

  const updated = mailModel.updateIsRead(mailId, isRead);
  const { password, ...safeMail } = updated;
  res.status(200).json(safeMail);
};

exports.markAsSpam = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = await mailModel.markMailAsSpam(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail marked as spam and URLs blacklisted." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};

exports.unmarkAsSpam = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = await mailModel.unmarkMailAsSpam(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail unmarked as spam and URLs removed from blacklist." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};

exports.markAsFavorite = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = mailModel.markAsFavorite(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail marked as favorite." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};

exports.unmarkAsFavorite = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const result = mailModel.unmarkAsFavorite(id, userId);
  if (result) {
    res.status(200).json({ message: "Mail unmarked as favorite." });
  } else {
    res.status(404).json({ error: "Mail not found or unauthorized." });
  }
};
