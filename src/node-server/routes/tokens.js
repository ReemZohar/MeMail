const express = require('express');
const router = express.Router();
const tokensController = require('../controllers/tokens');
const authenticateToken = require('../middleware/auth');

// Login route (issue token)
router.post('/', tokensController.login);

router.post('/logout', authenticateToken, authController.logout);

module.exports = router;
