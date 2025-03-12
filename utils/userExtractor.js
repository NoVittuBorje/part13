const jwt = require('jsonwebtoken')
const {User} = require('../models')
const config = require('../utils/config')
const userExtractor = async (request, response, next) => {
  if(request.token){
    try {
      const decodedToken = jwt.verify(request.token, config.SECRET)
      const user = await User.findByPk(decodedToken.id)
      request.user = user
      next()
    }catch(error){console.log(error);response.status(401).json({ error: 'Invalid token' })}}
  else{next()}}

module.exports = userExtractor