const mailModel = require('../models/mails'); // mail holds the in-memory model
const userModel = require('../models/users');

// Get the 50 most recent mails (sorted by time, newest first)
exports.getAllMails = (req, res) => {
    const userId = req.header("user-id");
    const user = userModel.getUserById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const mails = mailModel.getAllMailsForUser(userId);
    res.status(200).json(mails);
};

// Send a new mail
exports.sendMail = async (req, res) => {
  const { title, content, receiver } = req.body;
  const sender = req.user.id; //from JWT

  if (!title || !content || !receiver) {
    return res.status(400).json({ error: 'Missing required fields\n' });
  }

  const senderUser = userModel.getUserById(sender);
  const receiverUser = userModel.getUserByUsername(receiver); // user name
  if (!senderUser || !receiverUser) {
    return res.status(404).json({ error: 'Sender or receiver not found\n' });
  }

  const mail = await mailModel.sendMail(title, content, senderUser.id, receiverUser.id);
  if (!mail) {
    return res.status(400).json({ error: 'Mail contains blacklisted URL\n' });
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

    res.status(200).json(mail); // HTTP 200 OK
};

// Update an existing mail by ID (partial update for title/content)
exports.updateMail = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const updated = await mailModel.updateMail(id, title, content);
  if (!updated) {
    return res.status(404).json({ error: 'Mail not found or blacklisted URL\n' });
  }

    res.status(204).send();
};

// Delete a mail by ID
exports.deleteMail = (req, res) => {
    const id = parseInt(req.params.id);
    const success = mailModel.deleteMail(id);

    if (!success) {
        return res.status(404).json({ error: 'Mail not found\n' }); // HTTP 404 Not Found
    }

    res.status(204).send(); // HTTP 204 No Content
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
