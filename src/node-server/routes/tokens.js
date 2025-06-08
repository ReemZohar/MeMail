const express = require('express');
const router = express.Router();
const tokensController = require('../controllers/tokens');
const authenticateToken = require('../middleware/auth');

// Login route (issue token)
router.post('/', tokensController.login);

module.exports = router;
