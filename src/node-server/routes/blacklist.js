const express = require('express');
const router = express.Router();
const blacklistController = require('../controllers/blacklist');
const authenticateToken = require('../middleware/auth');

// Add a new blacklisted URL
router.post('/', authenticateToken, blacklistController.addToBlacklist);

// Remove blacklisted URL from body
router.delete('/', authenticateToken,blacklistController.removeFromBlacklist);

module.exports = router;