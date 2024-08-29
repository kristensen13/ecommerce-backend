const jwt = require("jsonwebtoken");
const User = require("../models/user");

const jwtValidate = (req, res, next) => {
  // read x-token headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token is required",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

const validateADMIN_ROLE = async (req, res, next) => {
  const uid = req.uid;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    if (userDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        msg: "You don't have the necessary permissions",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

const validateADMIN_ROLE_or_SameUser = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }

    if (userDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "You don't have the necessary permissions",
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

module.exports = {
  jwtValidate,
  validateADMIN_ROLE,
  validateADMIN_ROLE_or_SameUser,
};
