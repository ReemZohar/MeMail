const labelModel = require('../models/labels'); // label handles label operations
const userModel = require('../models/users');

exports.createLabel = (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  if (!name) return res.status(400).json({ error: 'Name is required\n' });

  const user = userModel.getUserById(userId);
  if (!user) return res.status(404).json({ error: 'User not found\n' });

  // check if the user has the same name lable
  const existingLabels = labelModel.getAllLabelsForUser(userId);
  const labelExists = existingLabels.some(label => label.name === name);

  if (labelExists) {
    return res.status(409).json({ error: 'Label with the same name already exists for this user\n' });
  }

  const label = labelModel.createLabel(name, userId);
  res.status(201).location(`/api/labels/${label.id}`).send();
};

exports.getAllLabels = (req, res) => {
  const userId = req.user.id;
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
      if (!authorizeOwnership(label, req.user.id, res)) return;

    res.status(200).json(label);
};

// Update a label by ID
exports.updateLabel = (req, res) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    const label = labelModel.getLabelById(id);
    if (!label) {
    return res.status(404).json({ error: 'Label not found\n' });
    }
    if (!authorizeOwnership(label, req.user.id, res)) return;

    const success = labelModel.updateLabel(id, name);
    if (!success) {
        return res.status(404).json({ error: 'Label not found\n' }); // HTTP 404 Not Found
    }
    res.status(204).send(); // HTTP 204 No Content
};

// Delete a label by ID
exports.deleteLabel = (req, res) => {
  const id = Number(req.params.id);
  const label = labelModel.getLabelById(id);
  if (!label) {
    return res.status(404).json({ error: 'Label not found\n' });
  }

  if (!authorizeOwnership(label, req.user.id, res)) return;

  const success = labelModel.deleteLabel(id);
  if (!success) {
    return res.status(404).json({ error: 'Failed to delete label\n' });
  }

  res.status(204).send(); // HTTP 204 No Content
};

//remove lable from mail
exports.removeLabelFromMail = (req, res) => {
  const mailId = Number(req.params.id);
  const labelId = Number(req.params.labelId);

  const mail = mailModel.getMailById(mailId);
  if (!mail) {
    return res.status(404).json({ error: 'Mail not found' });
  }

  if (mail.receiver !== req.user.id && mail.sender !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  const updatedMail = mailModel.removeLabelFromMail(mailId, labelId);
  if (!updatedMail) {
    return res.status(400).json({ error: 'Label not found on mail' });
  }

  res.status(200).json(updatedMail);
};


exports.addLabelToMail = (req, res) => {
  const mailId = Number(req.params.id);
  const { labelId } = req.body;

  // basic check to make sure the lable exists
  if (!labelId) {
    return res.status(400).json({ error: 'labelId is required' });
  }

  const mail = mailModel.getMailById(mailId);
  if (!mail) {
    return res.status(404).json({ error: 'Mail not found' });
  }

  // check that the mail is of the user account
  if (mail.receiver !== req.user.id && mail.sender !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized to label this mail' });
  }

  // check that lable exists
  const label = labelModel.getLabelById(labelId);
  if (!label) {
    return res.status(404).json({ error: 'Label not found' });
  }

  // adding the lable to mail
  const updatedMail = mailModel.addLabelToMail(mailId, labelId);
  res.status(200).json(updatedMail);

};

function authorizeOwnership(resource, userId, res) {
  if (resource.userId !== userId) {
    res.status(403).json({ error: 'Unauthorized' });
    return false;
  }
  return true;
}
