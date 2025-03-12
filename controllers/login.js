const jwt = require('jsonwebtoken')
const loginRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const { SECRET } = require('../utils/config')
const { User,Blogs,Sessions } = require('../models')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const password_correct = user === null
    ? false
    : await bcrypt.compare(body.password,user.password_hash)

  if (!(user && password_correct)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  if (user.disabled) {
    return response.status(401).json({
      error: 'account disabled'
    })
  }
  const userForToken = {
    username: user.username,
    id: user.id,
  }
  const token = jwt.sign(userForToken, SECRET)
  const sess = await Sessions.create({user_id:user.id,token:token})
  console.log(sess)
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter