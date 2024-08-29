const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getFrontendMenu } = require("../helpers/frontend-menu");

const login = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // Verify email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email not found",
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password not valid",
      });
    }

    // Generate token - JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
      menu: getFrontendMenu(userDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

const loginGoogle = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const userDB = await User.findOne({ email });
    let user;

    if (!userDB) {
      user = new User({
        name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }
    if (!user.img) {
      // si no existe usa la de google
      user.img = picture;
    }

    // Save in DB
    await user.save();

    // Generate token - JWT
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      token,
      menu: getFrontendMenu(user.role),
      // email,
      // name,
      // picture,
      // token,
      // id_token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  const user = await User.findById(uid);

  // Generate token - JWT
  const token = await generateJWT(uid);

  res.json({
    ok: true,
    token,
    user,
    menu: getFrontendMenu(user.role),
  });
};

module.exports = {
  login,
  loginGoogle,
  renewToken,
};
