const _ = require('lodash');
const User = require('../models/user')

const usersInDb = async () => {
  const users = await User.find({}).exec()
  return users.map(u => u.toJSON())
}

module.exports = {

  usersInDb,
}