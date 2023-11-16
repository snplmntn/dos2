const User = require("../../models/User");
const Announcement = require("../../models/Content/Article");
const Post = require("../../models/Content/Post");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user_get = async (req, res) => {
  const { userId, username } = req.query;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const {
      email,
      emailValid,
      section,
      friends,
      accountVerification,
      dateAccountCreated,
      verificationToken,
      verificationTokenExpiry,
      password,
      isAdmin,
      __v,
      ...other
    } = user._doc;
    return res.status(200).json({ message: "User Fetched", other });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const user_index = async (req, res) => {
  try {
    const accounts = await User.find();
    res.status(200).json(accounts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const user_delete = async (req, res) => {
  // if (req.body.userId === req.params.id || req.user.isAdmin) {
  try {
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("Account Successfully Deleted");
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
  // } else {
  //   return res.status(403).json("You can only delete your own account");
  // }
};

const user_update = async (req, res) => {
  const KEY = process.env.KEY;
  const { userId } = req.params;

  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error", err });
    }
  }

  if (req.body.firstname && req.body.lastname) {
    req.body.fullname = req.body.firstname + " " + req.body.lastname;
    req.body.nameValid = true;
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not Found." });

    const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    const payload = { user: JSON.stringify(user), exp: expiration };
    const token = jwt.sign(payload, KEY);

    return res
      .status(200)
      .json({ message: "Account Successfully Updated", token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const user_find = async (req, res) => {
  //Email or Username
  const { account } = req.query;
  try {
    // Check if the user exists by email or username
    const user = await User.findOne({
      $or: [{ email: account }, { username: account }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      emailValid,
      section,
      friends,
      accountVerification,
      dateAccountCreated,
      verificationToken,
      verificationTokenExpiry,
      password,
      isAdmin,
      __v,
      ...other
    } = user._doc;
    res.status(200).json({ message: "User Fetched", other });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const user_recover = async (req, res) => {
  const KEY = process.env.KEY;
  const { userId } = req.params;
  let { password } = req.body;

  if (password) {
    try {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error", err });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { password: password },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not Found." });

    const expiration = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
    const payload = { user: JSON.stringify(user), exp: expiration };
    const token = jwt.sign(payload, KEY);

    return res
      .status(200)
      .json({ message: "Account Successfully Recovered", token: token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};
module.exports = {
  user_find,
  user_recover,
  user_get,
  user_index,
  user_delete,
  user_update,
};
