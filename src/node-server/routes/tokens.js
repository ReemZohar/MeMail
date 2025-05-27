const express = require('express');
const router = express.Router();
const tokensController = require('../controllers/tokens');

// Login route (issue token)
router.post('/', tokensController.login);

module.exports = router;
