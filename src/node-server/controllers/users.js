const userModel = require('../models/users'); // user handles user registration and retrieval
// Register a new user
exports.registerUser = (req, res) => {
const { username, password, confirmPassword, name, avatar } = req.body;
    if (!username || !password || !confirmPassword || !name || !avatar) {
    return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return res.status(400).json({ error: 'Password must be at least 8 characters and contain letters and digits' });
    }
    if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
    }

    const newUser = userModel.registerUser(username, password, name, avatar);
    if (!newUser) {
    return res.status(400).json({ error: 'Username already exists' });
    }
   const { id } = newUser;
res.status(201).json({ id, username, name, avatar }); // without password
 // HTTP 201 Created
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

