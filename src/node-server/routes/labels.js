const express = require('express');
const router = express.Router();
const labelsController = require('../controllers/labels');
const authenticateToken = require('../middleware/auth');

// Get all labels
router.get('/', authenticateToken, labelsController.getAllLabels);

// Create a label
router.post('/', authenticateToken, labelsController.createLabel);

// Get label by ID
router.get('/:id', authenticateToken, labelsController.getLabelById);

// Update a label
router.patch('/:id', authenticateToken, labelsController.updateLabel);

// Delete a label
router.delete('/:id', authenticateToken, labelsController.deleteLabel);

//asign mail to lable
router.post('/:id/labels', authenticateToken, labelsController.addLabelToMail);

//remove assigment mail to lable
router.delete('/:id/labels/:labelId', authenticateToken, labelsController.removeLabelFromMail);

module.exports = router;