const userModel = require('../models/users'); // user handles user registration and retrieval
// Register a new user
exports.registerUser = (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    let avatarUrl;
    //user uploaded an avatar scenario
    if (req.file) {
      avatarUrl = `/uploads/avatars/${req.file.filename}`;
    }
    //user chose an existing avatar scenario
    else if (req.body.avatar) {
      avatarUrl = req.body.avatar;
    }
    const { name, surname, gender, day, month, year, username, password, confirmPassword } = req.body;
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E])[\x21-\x7E]{8,20}$/;
    if (!name) {
      return res.status(400).json({ error: 'Enter first name' });
    }
    if (!day || !month || !year) {
      return res.status(400).json({ error: 'Please fill in a complete date of birth' });
    }
    if (!userModel.validateDate(Number(day), Number(month), Number(year))) {
      return res.status(400).json({ error: 'Please enter a valid date' });
    }
    if (!username) {
      return res.status(400).json({ error: 'Enter a MeMail address' });
    }
    if (!/^[A-Za-z0-9.]+@[A-Za-z0-9]+\.[A-Za-z]{2,}$/.test(username)) {
      return res.status(400).json({
        error: 'Sorry, only letters (a-z), numbers (0-9), and periods (.) are allowed.'
      });
    }
    if (userModel.getUserByUsername(username)) {
      return res.status(400).json({ error: 'That username is taken. Try another.' });
    }
    if (!password || !confirmPassword) {
      return res.status(400).json({ error: 'Enter a password' });
    }
    if (!pwdRegex.test(password)) {
      return res.status(400).json({
        error: 'Your password must be 8-20 characters long, contain letters and numbers, ' +
          'and must not contain spaces, special characters, or emoji.'
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Those passwords didn't match. Try again." });
    }
    if (!avatarUrl) {
      return res.status(400).json({ error: 'Please select an avatar' });
    }

    const fullName = surname != "" ? name + " " + surname : name;
    const newUser = userModel.registerUser(
      fullName,
      gender,
      { day, month, year },
      username,
      password,
      avatarUrl
    );
    const { id } = newUser;
    const birthday = { day, month, year };
    res.status(201).json({ id, fullName, gender, birthday, username, avatarUrl }); // without password
    // HTTP 201 Created
  }
  catch (err) {
    next(err);   // passes to the JSON error handler above
  }
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

exports.validate = (req, res) => {
  const { step, username } = req.body;
  if (step === 2) {
    if (userModel.getUserByUsername(username)) {
      return res.status(400).json({ error: 'That username is taken. Try another.' });
    }
  }
  return res.status(200).json({ ok: true });
};

exports.uploadAvatar = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file received' });
  }
  user.avatar = `/uploads/avatars/${req.file.filename}`;
  res.json({ avatarUrl: user.avatar });
};

