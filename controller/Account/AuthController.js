const User = require("../../models/User");
const bcrypt = require("bcrypt");

const user_signup = async (req, res) => {
  try {
    //Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //Create User
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      section: req.body.section,
    });
    //Save User and Respond
    const user = await newUser.save();
    res.status(200).json({ message: "Signed Up Successfully", user });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const user_login = async (req, res) => {
  const { emailOrUsername, password } = req.body;
  try {
    // Check if the user exists by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid Username or Email" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    user.dateLastLoggedIn = date.now();
    return res.status(200).json({ message: "Login successful" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

module.exports = {
  user_signup,
  user_login,
};
