let userCount = 0
const users = []

//returns all the users - helper function
const getAllUsers = () => users;

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

const getUserByUsername = (username) =>
    users.find(user => user.username === username);


const getUserById = (id) => users.find(u => u.id === Number(id));

module.exports = {registerUser, getUserById, getAllUsers, getUserByUsername }