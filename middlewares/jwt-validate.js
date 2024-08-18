const jwt = require("jsonwebtoken");

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

module.exports = {
  jwtValidate,
};
