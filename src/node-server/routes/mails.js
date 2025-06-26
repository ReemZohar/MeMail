const express = require('express');
const router = express.Router();
const mailsController = require('../controllers/mails');
const labelsController = require('../controllers/labels');
const authenticateToken = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', authenticateToken, upload.array('attachments'), mailsController.sendMail);

// Get last 50 mails
router.get('/', authenticateToken, mailsController.getAllMails);

// Send a new mail
//router.post('/', authenticateToken, mailsController.sendMail);

//advanced mail search
router.get('/advanced', authenticateToken, mailsController.getAdvancedMails);

// Get mail by ID
router.get('/:id', authenticateToken, mailsController.getEnhancedMailById);

// Update existing mail
router.patch('/:id', authenticateToken, mailsController.updateMail);

// Delete a mail
router.delete('/:id', authenticateToken, mailsController.deleteMail);

// Search mails
router.get('/search/:query', authenticateToken, mailsController.searchMails);

//update is read
router.patch('/:id/isRead', authenticateToken, mailsController.updateIsReadStatus);

// NEW SPAM ROUTES
router.post('/:id/spam', authenticateToken, mailsController.markAsSpam);
router.post('/:id/unspam', authenticateToken, mailsController.unmarkAsSpam);

//NEW FAVORITES ROUTES
router.post('/:id/favorite', authenticateToken, mailsController.markAsFavorite);
router.post('/:id/unfavorite', authenticateToken, mailsController.unmarkAsFavorite);

//Label functionality
router.post('/:id/labels', authenticateToken, labelsController.addLabelToMail);
router.delete('/:id/labels/:labelId', authenticateToken, labelsController.removeLabelFromMail);

module.exports = router;
