const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokens');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET; // secert is saved in .env

exports.login = (req, res) => {
  const { username, password } = req.body;

  // validation 
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // check if user exists
const user = tokenModel.login(username, password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  // create JWT
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  //return the token only (not the pass)
  res.status(200).json({ token });
};


exports.logout = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token) {
    tokenModel.blacklistToken(token);
  }
  res.status(200).json({ message: "Logout successful" });
};

