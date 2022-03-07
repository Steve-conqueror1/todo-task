const bcrypt= require('bcryptjs')
const boom = require('boom');
const genericCrud = require('./generic.controller');
const { User } = require('../models');
const jwt = require('jsonwebtoken')


module.exports = {
  ...genericCrud(User),
    async create(req, res) {
    const {email, username, userType, password} = req.body;
    try {
      let existingUser = await User.findOne({email})
      if(existingUser){
        return res.status(422).json({message: "User exists already, login instead"});
      }
      let passwordHash = await bcrypt.hash(password, 12)
      const item = new User({email, username, userType, password: passwordHash});
      const createdUser = await item.save();
      const token = await jwt.sign({userId: createdUser.id, userType: createdUser.userType }, process.env.SECRET_KEY, {expiresIn: '120s'})
      return res.status(201).json({userId: createdUser.id, email: createdUser.email, username: createdUser.username, userType: createdUser.userType, token});
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const existingUser = await User.findOne({username})

      if(!existingUser){
        return res.status(404).send({username: "No user associated with this username"})
      }

      if(existingUser.username !== username){
        return res.status(409).send({username: "No user associated with this username"})
      }

      let isValidPassword = await bcrypt.compare(password, existingUser.password)
      if(!isValidPassword){
       return  res.status(409).send({password: "Wrong password"})
      }

      const token = await jwt.sign({userId: existingUser.id, userType: existingUser.userType }, process.env.SECRET_KEY, {expiresIn: '1200s'})
      return res.status(200).json({userId: existingUser.id, email: existingUser.email, userType: existingUser.userType, username: existingUser.username, token});
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
};
