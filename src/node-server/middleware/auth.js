const jwt = require('jsonwebtoken');
const { isTokenBlacklisted } = require('../models/tokens');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);
  if (isTokenBlacklisted(token)) return res.status(403).json({ error: 'Token is invalidated' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
