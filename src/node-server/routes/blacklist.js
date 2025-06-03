const express = require('express');
const router = express.Router();
const blacklistController = require('../controllers/blacklist');

// Add a new blacklisted URL
router.post('/', blacklistController.addToBlacklist);

// Remove blacklisted URL from body
router.delete('/', blacklistController.removeFromBlacklist);

module.exports = router;
