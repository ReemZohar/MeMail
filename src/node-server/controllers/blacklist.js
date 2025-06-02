const blacklistModel = require('../models/blacklist'); 

// Add a malicious link to the blacklist (no ID returned)
exports.addToBlacklist = async (req, res) => {
    console.log('addToBlacklist called with body:', req.body); //todo
    const { url } = req.body;
    if (!url) {
        console.log('URL missing in request body'); //todo
        return res.status(400).json({ error: 'URL is required\n' });
    }
    try {
        console.log('Calling blacklistModel.add with URL:', url);  //todo
        await blacklistModel.add(url);
        console.log('blacklistModel.add succeeded');  //todo
        res.status(201).send(); // no ID or Location
    } catch (error) {
        console.error('Blacklist add error:', error);
        res.status(500).json({ error: 'Failed to add to blacklist\n' });
    }
};



// Remove a blacklisted URL by URL (not ID)
exports.removeFromBlacklist = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required\n' });
    }
    try {
        const success = await blacklistModel.remove(url);
        if (!success) {
            return res.status(404).json({ error: 'Blacklist entry not found\n' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Remove from blacklist error:', error);
        res.status(500).json({ error: 'Failed to remove from blacklist\n' });
    }
};
