const mailModel = require('../model/mails'); // mailService holds the in-memory model

// Get the 50 most recent mails (sorted by time, newest first)
exports.getAllMails = (req, res) => {
    const mails = mailModel.getAllMails();
    res.status(200).json(mails); // HTTP 200 OK
};

// Send a new mail
exports.sendMail = (req, res) => {
    const { title, content, sender, receiver } = req.body;

    // Validate required fields
    if (!title || !content || !sender || !receiver) {
        return res.status(400).json({ error: 'Missing required fields' }); // HTTP 400 Bad Request
    }

    const sentMail = mailModel.sendMail(title, content, sender, receiver);
    res.status(201).json(sentMail); // HTTP 201 Created
};

// Get a specific mail by its ID
exports.getMailById = (req, res) => {
    const id = parseInt(req.params.id);
    const mail = mailModel.getMailById(id);

    if (!mail) {
        return res.status(404).json({ error: 'Mail not found' }); // HTTP 404 Not Found
    }

    res.status(200).json(mail); // HTTP 200 OK
};

// Update an existing mail by ID (partial update for title/content)
exports.updateMail = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    const updated = mailModel.updateMail(id, title, content);

    if (!updated) {
        return res.status(404).json({ error: 'Mail not found' }); // HTTP 404 Not Found
    }

    res.status(200).json(updated); // HTTP 200 OK
};

// Delete a mail by ID
exports.deleteMail = (req, res) => {
    const id = parseInt(req.params.id);
    const success = mailModel.deleteMail(id);

    if (!success) {
        return res.status(404).json({ error: 'Mail not found' }); // HTTP 404 Not Found
    }

    res.status(204).send(); // HTTP 204 No Content
};

// Search mails by query (matches title, content, sender or receiver)
exports.searchMails = (req, res) => {
    const query = req.params.query;
    const results = mailModel.searchMails(query);
    res.status(200).json(results); // HTTP 200 OK
};
