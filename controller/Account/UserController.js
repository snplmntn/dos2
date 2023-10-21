const User = require("../../models/User");
const bcrypt = require("bcrypt");

// const user_index = async (req, res) => {
//   const userId = req.query.userId;
//   const username = req.query.username;

//   try {
//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ username: username });
//     const { password, isAdmin, __v, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// };

const user_index = async (req, res) => {
  try {
    const accounts = await User.find();
    res.status(200).json(accounts);
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
};

const user_delete = async (req, res) => {
  // if (req.body.userId === req.params.id || req.user.isAdmin) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account Successfully Deleted");
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
  // } else {
  //   return res.status(403).json("You can only delete your own account");
  // }
};

const user_update = async (req, res) => {
  // if (req.body.userId === req.params.id || req.user.isAdmin) {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error", err });
    }
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account Successfully Updated");
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error", err });
  }
  // } else {
  //   return res
  //     .status(403)
  //     .json("You can only update things on your own account");
  // }
};

module.exports = {
  user_index,
  user_delete,
  user_update,
};
