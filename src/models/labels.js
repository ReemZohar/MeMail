let labelCounter = 0
const labels = []

const getAlllabels = () => {
    return labels
}

const createlabel = (name) => {
    const newLabel = { id: ++labelCounter, name}
    labels.push(newLabel)
    return newLabel
}

const getlabelById = (id) => labels.find(l => l.id === id)

const updatelabel = (id, name) => {
    const label = labels.find(l => l.id === id)
    if(!label) return null
    if(label) labels.name = name
    return label
}

const deleteLabel = (id) => {
    const index = labels.findIndex(l => l.id === id)
    if (index === -1) return false
    labels.splice(index, 1)
    return true
}