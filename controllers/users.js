const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  const [users, total] = await Promise.all([
    User.find({}, "name email role google img").skip(from).limit(5),
    User.countDocuments(),
  ]);
  res.json({
    ok: true,
    users,
    total,
    uid: req.uid,
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "Email already exists",
      });
    }

    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Save user
    await user.save();

    // Generate token - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

const updateUser = async (req, res = response) => {
  // TODO: validate token and check if the user can be updated
  const uid = req.params.id;
  const { password, google, email, ...user } = req.body;
  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    // Update user
    const { password, google, email, ...fields } = req.body;
    if (userDB.email !== email) {
      const emailExists = await User.findOne({
        email,
      });
      if (emailExists) {
        return res.status(400).json({
          ok: false,
          msg: "Email already exists",
        });
      }
    }

    fields.email = email;

    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

const deleteUser = async (req, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "User deleted",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
