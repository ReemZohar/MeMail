const tokenModel = require('../models/tokens'); // token handles login authentication

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' }); // HTTP 400 Bad Request
    }

    const user = tokenModel.authenticateUser(username, password);
    if (!user) {
        return res.status(404).json({ error: 'Invalid username or password' }); // HTTP 404 Not Found
    }

    res.status(200).json({ id: user.id }); // HTTP 200 OK
};
