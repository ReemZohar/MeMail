const blacklistModel = require('../models/blacklistService'); // blacklistService handles malicious links

// Add a malicious link to the blacklist
exports.addToBlacklist = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }
    try {
        const blacklisted = await blacklistModel.add(url);
        res.status(201).location(`/api/blacklist/${blacklisted.id}`).send(); // HTTP 201 Created
    } catch (error) {
        res.status(500).json({ error: 'Failed to add to blacklist' });
    }
};

// Remove a blacklisted URL by ID
exports.removeFromBlacklist = async (req, res) => {
    const id = req.params.id;
    try {
        const success = await blacklistModel.remove(id);
        if (!success) {
            return res.status(404).json({ error: 'Blacklist entry not found' });
        }
        res.status(204).send(); // HTTP 204 No Content
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove from blacklist' });
    }
};