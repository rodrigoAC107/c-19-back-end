const jwt = require("jsonwebtoken");

const generateToken = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.SECRET_PRIVATE_KEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log({ err });
          return reject("Could not generate token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateToken,
};
