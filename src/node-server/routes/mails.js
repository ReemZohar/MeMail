const express = require('express');
const router = express.Router();
const mailsController = require('../controllers/mails');

// Get last 50 mails
router.get('/', mailsController.getAllMails);

// Send a new mail
router.post('/', mailsController.sendMail);

// Get mail by ID
router.get('/:id', mailsController.getMailById);

// Update existing mail
router.patch('/:id', mailsController.updateMail);

// Delete a mail
router.delete('/:id', mailsController.deleteMail);

// Search mails
router.get('/search/:query', mailsController.searchMails);

//update is read
router.patch('/:id', authenticateToken, mailsController.updateIsReadStatus);

module.exports = router;
