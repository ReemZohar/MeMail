let labelCounter = 0
const labels = []

const getAllLabelsForUser = (userId) => {
  return labels.filter(l => l.userId === userId);
};

const createLabel = (name, userId) => {
    const newLabel = { id: ++labelCounter, name, userId}
    labels.push(newLabel)
    return newLabel
}

const getLabelById = (id) => labels.find(l => l.id === id)

const updateLabel = (id, name) => {
    const label = labels.find(l => l.id === id)
    if (!label) return null
    label.name = name
    return label
}

const deleteLabel = (id) => {
    const index = labels.findIndex(l => l.id === id)
    if (index === -1) return false
    labels.splice(index, 1)
    return true
}


module.exports = {getAllLabelsForUser, createLabel, getLabelById, updateLabel, deleteLabel}