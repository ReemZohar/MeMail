const express = require('express');
const router = express.Router();
const blacklistController = require('../controllers/blacklist');

// Add a new blacklisted URL
router.post('/', blacklistController.addToBlacklist);

// Remove blacklisted URL by ID
router.delete('/:id', blacklistController.removeFromBlacklist);

module.exports = router;
