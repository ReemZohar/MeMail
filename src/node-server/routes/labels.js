const express = require('express');
const router = express.Router();
const labelsController = require('../controllers/labels');
const authenticateToken = require('../middleware/auth');

// Get all labels
router.get('/', labelsController.getAllLabels);

// Create a label
router.post('/', labelsController.createLabel);

// Get label by ID
router.get('/:id', labelsController.getLabelById);

// Update a label
router.patch('/:id', labelsController.updateLabel);

// Delete a label
router.delete('/:id', labelsController.deleteLabel);

//asign mail to lable
router.post('/:id/labels', authenticateToken, labelsController.addLabelToMail);

//remove assigment mail to lable
router.delete('/:id/labels/:labelId', authenticateToken, labelsController.removeLabelFromMail);

module.exports = router;
