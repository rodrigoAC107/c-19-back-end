const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { generateToken } = require("../helpers/token-generate");
const { User } = require("../models");



const login = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const user = await User.findOne({email});

    if (!user) return res.status(400).json({msg: 'User / Password dont correct - user'});

    if (user.deleted_at) return res.status(400).json({msg: 'User / Password dont correct - delete'});

    const validPassword = bcryptjs.compareSync( password, user.password );

    if ( !validPassword ) return res.status(400).json({ msg: 'User / Password dont correct - Pass'});

    const token = await generateToken(user.id);

    res.json({
      user,
      token
    });
    
  } catch (error) {
    console.log({error});
    res.status(500).json({ msg: 'Call the Administrator' })
  }
} 

module.exports = {
  login
}