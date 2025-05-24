const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

router.post('/', usersController.registerUser);
router.get('/:id', usersController.getUserById);

module.exports = router;
