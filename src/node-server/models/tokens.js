const users = require('./users')  //get all the users
const blacklistedTokens = new Set();

const login = (username, password) => {
    const user = users.getAllUsers().find(u => u.username === username && u.password === password);
    if (!user) {  //user not found
        return null;
    }
    return user;
}

const blacklistToken = (token) => {
  blacklistedTokens.add(token);
};

const isTokenBlacklisted = (token) => {
  return blacklistedTokens.has(token);
};


module.exports = {  blacklistToken,  isTokenBlacklisted,  login};