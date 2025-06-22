let idCounter = 0;
const drafts = [];

// יצירת טיוטה חדשה
const createDraft = (title, content, receiver, sender) => {
  const draft = {
    id: idCounter++,
    title,
    content,
    receiver,
    sender,
    time: Date.now()
  };
  drafts.push(draft);
  return draft;
};

// עדכון טיוטה קיימת
const updateDraft = (id, sender, title, content, receiver) => {
  const draft = drafts.find(d => d.id === parseInt(id) && d.sender === sender);
  if (!draft) return null;
  if (title !== undefined) draft.title = title;
  if (content !== undefined) draft.content = content;
  if (receiver !== undefined) draft.receiver = receiver;
  draft.time = Date.now();
  return draft;
};

// שליפה לפי ID
const getDraftById = (id, sender) =>
  drafts.find(d => d.id === parseInt(id) && d.sender === sender);

// מחיקת טיוטה
const deleteDraft = (id, sender) => {
  const index = drafts.findIndex(d => d.id === parseInt(id) && d.sender === sender);
  if (index === -1) return false;
  drafts.splice(index, 1);
  return true;
};

// ✅ שליפה של כל הטיוטות לפי השולח
const getDraftsBySender = (sender) =>
  drafts.filter(d => d.sender === sender);

module.exports = {
  createDraft,
  updateDraft,
  getDraftById,
  deleteDraft,
  getDraftsBySender // ייצוא של הפונקציה החדשה
};
