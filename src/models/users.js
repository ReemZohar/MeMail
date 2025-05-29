let userCount = 0
const users = []

const registerUser = (username, password, name, avatar) => {
    if (users.some(user => user.username === username)) { //if the user already exists
        return null;
    }

    const newUser = {
        id: ++userCount,
        username,
        password,
        name,
        avatar
    };

    users.push(newUser);
    return newUser;
}


const getUserById = (id) => users.find(u => u.id === id)

module.exports = {registerUser, getUserById}