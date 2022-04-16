const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const tokenValidation = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) return res.status(401).json({ msg: "There isnt token in request" });

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_PRIVATE_KEY);

    const user = await User.findById(uid);

    if (!user)
      return res.status(401).json({ msg: "Token invalid - User dont exist" });

    if (user.deleted_at)
      return res.status(401).json({ msg: "Token invalid - User deleted" });

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
        msg: 'Token no válido'
    })
  }
};

module.exports = {
  tokenValidation,
};
