const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRETKEY,
      {
        expiresIn: "365d",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("cant generate the token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
  generateJWT,
};
