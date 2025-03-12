const {Sessions} = require('../models')
const sessionChecker = async (request, response, next) => {
    if(request.token){
      try {
        const session = await Sessions.findOne({ where: { token:request.token} })
        
        if (session.active === false){
            response.status(400).json({ error: 'token not active' })
        }
        next()
      }catch(error){console.log(error);response.status(401).json({ error: 'Invalid token' })}}
    else{next()}}
  
module.exports = sessionChecker