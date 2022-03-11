const { request, response } = require("express");

const validateRoles = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.authUser) {
      return res.status(500).json({
        msg: "You want to verify the role without previously verifying the token",
      });
    }

    const { role, name } = req.authUser;

    if (!roles.includes(role)) {
      return res.status(401).json({
        msg: `The user '${name}' dosent have one of this roles '${roles}'`,
      });
    }

    next();
  };
};

module.exports = {
  validateRoles,
};
