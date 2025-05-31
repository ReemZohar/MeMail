let labelCounter = 0
const labels = []

const getAllLabels = () => {
    return labels
}

const createLabel = (name) => {
    const newLabel = { id: ++labelCounter, name}
    labels.push(newLabel)
    return newLabel
}

const getlabelById = (id) => labels.find(l => l.id === id)

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


module.exports = {getAlllabels, createlabel, getlabelById, updatelabel, deleteLabel}