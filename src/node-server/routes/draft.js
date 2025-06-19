const express = require('express');
const router = express.Router();
const draftController = require('../controllers/draft');
const authenticateToken = require('../middleware/auth');

router.post('/', authenticateToken, draftController.createDraft);
router.put('/:id', authenticateToken, draftController.updateDraft);
router.get('/:id', authenticateToken, draftController.getDraftById);
router.delete('/:id', authenticateToken, draftController.deleteDraft);

module.exports = router;
