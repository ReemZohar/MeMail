const userModel = require('../models/users'); // user handles user registration and retrieval
// Register a new user
exports.registerUser = (req, res) => {
    const { username, password, name, avatar } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required\n' });
    }
    const newUser = userModel.registerUser(username, password, name, avatar);
    res.status(201).json(newUser); // HTTP 201 Created
};

// Get a user by ID
exports.getUserById = (req, res) => {
  const id = Number(req.params.id);

  //jwt authenticate
  if (req.user && req.user.id !== id) {
    return res.status(403).json({ error: 'Forbidden' }); // Not allowed to access other users
  }

  const user = userModel.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found\n' });
  }

  // remove sensitive fields
  const { password, ...safeUser } = user;
  res.status(200).json(safeUser);
};
