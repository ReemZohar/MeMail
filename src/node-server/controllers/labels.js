const labelModel = require('../models/labels'); // label handles label operations
const userModel = require('../models/users');

exports.createLabel = (req, res) => {
  const userId = req.header("user-id");
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required\n' });
  const user = userModel.getUserById(userId);
  if (!user) return res.status(404).json({ error: 'User not found\n' });
  const label = labelModel.createLabel(name, userId);
  res.status(201).location(`/api/labels/${label.id}`).send();
};

exports.getAllLabels = (req, res) => {
  const userId = req.header("user-id");
  const user = userModel.getUserById(userId);
  if (!user) return res.status(404).json({ error: 'User not found\n' });
  const labels = labelModel.getAllLabelsForUser(userId);
  res.status(200).json(labels);
};


// Get a label by ID
exports.getLabelById = (req, res) => {
    const id = Number(req.params.id);
    const label = labelModel.getLabelById(id);
    if (!label) {
        return res.status(404).json({ error: 'Label not found\n' });
    }
    res.status(200).json(label);
};

// Update a label by ID
exports.updateLabel = (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;
    const success = labelModel.updateLabel(id, name);
    if (!success) {
        return res.status(404).json({ error: 'Label not found\n' }); // HTTP 404 Not Found
    }
    res.status(204).send(); // HTTP 204 No Content
};

// Delete a label by ID
exports.deleteLabel = (req, res) => {
    const id = Number(req.params.id);
    const success = labelModel.deleteLabel(id);
    if (!success) {
        return res.status(404).json({ error: 'Label not found\n' }); // HTTP 404 Not Found
    }
    res.status(204).send(); // HTTP 204 No Content
};
