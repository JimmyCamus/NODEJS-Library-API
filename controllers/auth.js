const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");

const authErrorMessage = "User / Password doesnt match";

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: authErrorMessage,
      });
    }

    if (!user.state) {
      return res.status(400).json({
        msg: authErrorMessage,
      });
    }

    if (!bcryptjs.compareSync(password, user.password)) {
      return res.status(400).json({
        msg: authErrorMessage,
      });
    }

    const token = await generateJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal Server ERROR",
    });
  }
};

const validate = async (req, res = response) => {
  const authUser = req.authUser;
  return res.json({ user: authUser });
};

module.exports = {
  login,
  validate,
};
