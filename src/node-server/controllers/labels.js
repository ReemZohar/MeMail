const labelModel = require('../models/labels'); // label handles label operations

// Get all labels
exports.getAllLabels = (req, res) => {
    const userId = req.header("user-id");
    const labels = labelModel.getAllLabelsForUser(userId);
    res.status(200).json(labels);
};

// Create a new label
exports.createLabel = (req, res) => {
    const userId = req.header("user-id");
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const label = labelModel.createLabel(name, userId);
    res.status(201).location(`/api/labels/${label.id}`).send();
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
