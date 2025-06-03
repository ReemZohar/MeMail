const users = require('./users')  //get all the users

const login = (username, password) => {
    const user = users.getAllUsers().find(u => u.username === username && u.password === password);
    if (!user) {  //user not found
        return null;
    }
    return user;
}

module.exports = { login }