const User = require("../../models/User");
const InvalidToken = require("../../models/InvalidToken");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user_signup = async (req, res) => {
  const { firstname, lastname, username, email, password, section } = req.body;
  try {
    //Encrypt Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const fullname = firstname + " " + lastname;
    //Create User
    const newUser = new User({
      firstname: firstname,
      lastname: lastname,
      fullname: fullname,
      username: username,
      email: email,
      password: hashedPassword,
      section: section,
    });
    //Save User and Respond
    await newUser.save();
    res.status(200).json({ message: "Signed Up Successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const user_login = async (req, res) => {
  const KEY = process.env.KEY;
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

    user.dateLastLoggedIn = Date.now();

    const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    const payload = { user: JSON.stringify(user), exp: expiration };
    const token = jwt.sign(payload, KEY);

    // const {
    //   password,
    //   isAdmin,
    //   __v,
    //   emailValid,
    //   friends,
    //   accountVerification,
    //   dateAccountCreated,
    //   verificationToken,
    //   dateLastLoggedIn,
    //   ...other
    // } = user._doc;

    return res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const InvalidateToken = async (req, res) => {
  const token = new InvalidToken(req.body);
  try {
    const saveToken = await token.save();
    res.status(200).json({ message: "Logged Out Successfully", saveToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const user_logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
};

module.exports = {
  user_signup,
  user_login,
  InvalidateToken,
};
