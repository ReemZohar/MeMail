const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authenticateToken = require('../middleware/auth');

router.post('/', usersController.registerUser);
router.post('/validate', usersController.validate);
router.get('/:id', authenticateToken, usersController.getUserById);

module.exports = router;
