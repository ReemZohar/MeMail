let userCount = 0
const users = []

//returns all the users - helper function
const getAllUsers = () => users;

const registerUser = (name, gender, {day, month, year}, username, password, avatar) => {
    if (users.some(user => user.username === username)) { //if the user already exists
        return null;
    }
    
    const birthday = {
        day,
        month,
        year,
    }

    const newUser = {
        id: ++userCount,
        name,
        gender,
        birthday,
        username,
        password,
        avatar
    };

    users.push(newUser);
    return newUser;
}

const isNumInRange = (num, min, max) => (num <= max) && (num >= min);

//validates the combination of a day and a month
const validateDayAndMonth = (day, month) => {
    const minDay = 1, febMaxDays = 29;
    const monthsWith30D = [4, 6, 9, 11];
    const monthsWith31D = [1, 3, 5, 7, 10, 12]
    var maxDay;

    if (monthsWith31D.includes(month)) maxDay = 31;
    else if (monthsWith30D.includes(month)) maxDay = 30;
    else maxDay = febMaxDays;

    return isNumInRange(day, minDay, maxDay);
}

function validateDate(day, month, year) {
    const minMonth = 1, maxMonth = 12;
    const maxYear = new Date().getFullYear();
    //google's max age allowed
    const maxAge = 130;
    const minYear = maxYear - maxAge;

    return isNumInRange(year, minYear, maxYear) && isNumInRange(month, minMonth, maxMonth) && validateDayAndMonth(day, month)
}

const getUserByUsername = (username) =>
    users.find(user => user.username === username);


const getUserById = (id) => users.find(u => u.id === Number(id));

module.exports = {registerUser, getUserById, getAllUsers, getUserByUsername, validateDate }