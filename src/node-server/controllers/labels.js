const labelModel = require('../models/lables'); // labelService handles label operations

// Get all labels
exports.getAllLabels = (req, res) => {
    const labels = labelModel.getAllLabels();
    res.status(200).json(labels); // HTTP 200 OK
};

// Create a new label
exports.createLabel = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' }); // HTTP 400 Bad Request
    }
    const newLabel = labelModel.createLabel(name);
    res.status(201).location(`/api/labels/${newLabel.id}`).send(); // HTTP 201 Created
};

// Get a label by ID
exports.getLabelById = (req, res) => {
    const id = req.params.id;
    const label = labelModel.getLabelById(id);
    if (!label) {
        return res.status(404).json({ error: 'Label not found' }); // HTTP 404 Not Found
    }
    res.status(200).json(label); // HTTP 200 OK
};

// Update a label by ID
exports.updateLabel = (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const success = labelModel.updateLabel(id, name);
    if (!success) {
        return res.status(404).json({ error: 'Label not found' }); // HTTP 404 Not Found
    }
    res.status(204).send(); // HTTP 204 No Content
};

// Delete a label by ID
exports.deleteLabel = (req, res) => {
    const id = req.params.id;
    const success = labelModel.deleteLabel(id);
    if (!success) {
        return res.status(404).json({ error: 'Label not found' }); // HTTP 404 Not Found
    }
    res.status(204).send(); // HTTP 204 No Content
};
