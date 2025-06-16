const draftModel = require('../models/draft');

exports.createDraft = (req, res) => {
  const { title = '', content = '', receiver = '' } = req.body;
  const sender = req.user.id;
  const draft = draftModel.createDraft(title, content, receiver, sender);
  res.status(201).json(draft);
};

exports.updateDraft = (req, res) => {
  const { id } = req.params;
  const { title, content, receiver } = req.body;
  const sender = req.user.id;
  const updated = draftModel.updateDraft(id, sender, title, content, receiver);
  if (!updated) return res.status(404).json({ error: 'Draft not found' });
  res.status(200).json(updated);
};

exports.getDraftById = (req, res) => {
  const draft = draftModel.getDraftById(req.params.id, req.user.id);
  if (!draft) return res.status(404).json({ error: 'Draft not found' });
  res.json(draft);
};

exports.deleteDraft = (req, res) => {
  const success = draftModel.deleteDraft(req.params.id, req.user.id);
  if (!success) return res.status(404).json({ error: 'Draft not found' });
  res.status(204).send();
};
