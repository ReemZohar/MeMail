//The file loads all the relevant routs to run the client requests
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');

router.use('/users', require('./users'));
router.use('/tokens', require('./tokens'));
router.use('/mails', require('./mails'));
router.use('/labels', require('./labels'));
router.use('/blacklist', require('./blacklist'));
router.use('/draft', require('./draft.js'));

module.exports = router;