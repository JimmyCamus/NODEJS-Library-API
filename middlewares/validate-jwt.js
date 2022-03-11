const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "The token isnt define",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    const authUser = await User.findById(uid);

    if (!authUser || !authUser.state) {
      return res.status(401).json({
        msg: "Invalid Token",
      });
    }

    req.authUser = authUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Invalid Token",
    });
  }
};

module.exports = {
  validateJWT,
};
