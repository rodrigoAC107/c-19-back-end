const bcryptjs = require("bcryptjs");

const { response } = require("express");
const { User } = require('../models');


const getUser = async(req, res = response) => {

  const { email } = req.params;
  
  const user = await User.findOne( email );

  res.json( user );
}

const createUser = async(req, res = response) => {

  const { name, email, password } = req.body;

  const user = new User({ name, email, password });

  // encript password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync( password, salt );

  // Save in DB
  await user.save();

  res.json({ user });

}

const putUser = async(req, res = response) => {

  const { id } = req.params;
  const { _id, password, ...data } = req.body;

  if( password ){
    // Encript password
    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync( password, salt );
  }

  const user = await User.findByIdAndUpdate(id, data, { new: true });

  res.json( user );

}

const deleteUser = async(req, res = response) => {

  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, { deleted_at: Date.now() });

  res.json( user );

}

module.exports = {
  getUser,
  createUser,
  putUser,
  deleteUser
}