const express = require('express');
const router = express.Router();
const mailsController = require('../controllers/mails');
const authenticateToken = require('../middleware/auth');

// Get last 50 mails
router.get('/', authenticateToken, mailsController.getAllMails);

// Send a new mail
router.post('/', authenticateToken,mailsController.sendMail);

// Get mail by ID
router.get('/:id', authenticateToken, mailsController.getMailById);

// Update existing mail
router.patch('/:id', authenticateToken,mailsController.updateMail);

// Delete a mail
router.delete('/:id', authenticateToken,mailsController.deleteMail);

// Search mails
router.get('/search/:query', authenticateToken, mailsController.searchMails);

//update is read
router.patch('/:id', authenticateToken, mailsController.updateIsReadStatus);

// NEW SPAM ROUTES
router.post('/:id/spam', authenticateToken, mailsController.markAsSpam);
router.post('/:id/unspam', authenticateToken, mailsController.unmarkAsSpam);

//NEW FAVORITES ROUTES
router.post('/:id/favorite', authenticateToken, mailsController.markAsFavorite);
router.post('/:id/unfavorite', authenticateToken, mailsController.unmarkAsFavorite);

module.exports = router;
