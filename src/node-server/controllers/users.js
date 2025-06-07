const userModel = require('../models/users'); // user handles user registration and retrieval
// Register a new user
exports.registerUser = (req, res) => {
    const { username, password, name, avatar } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required\n' });
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters and contain letters and digits' });
    }

    const newUser = userModel.registerUser(username, password, name, avatar);
    res.status(201).json(newUser); // HTTP 201 Created
};

// Get a user by ID
exports.getUserById = (req, res) => {
    const id = Number(req.params.id);
    const user = userModel.getUserById(id);
    if (!user) {
        return res.status(404).json({ error: 'User not found\n' }); // HTTP 404 Not Found
    }
    res.status(200).json(user); // HTTP 200 OK
};