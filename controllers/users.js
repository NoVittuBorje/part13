const userRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const { User,Blogs } = require('../models')
const { Op } = require('sequelize')
const userExtractor = require('../utils/userExtractor')
const tokenExtractor = require('../utils/tokenExtractor')
const sessionChecker = require('../utils/sessionChecker')

userRouter.get('/', async (req, res) => {
    const users = await User.findAll({
      include: {
        model: Blogs
      }
  })
    res.json(users)
})

userRouter.post('/', async (req, res) => {
    const salt_rounds = 10
    const passwordHash = await bcrypt.hash(req.body.password,salt_rounds)
    try {
        const user = await User.create({username:req.body.username,name:req.body.name,password_hash:passwordHash})
        res.json(user)
    } catch(error) {
        return res.status(400).json({ error })
    }
})

userRouter.get('/:id', async (req, res) => {
  let read = {
    [Op.in]: [true, false]
  }
  if ( req.query.read ) {
    read = req.query.read === "true"
  }
  const user = await User.findByPk(req.params.id,{
    attributes:{ exclude: ['id','password_hash',"admin","disabled","createdAt", "updatedAt"]},
    as:"readings",
    include:[{
      model:Blogs,
      as:"readings",
      attributes:{exclude:["createdAt","updatedAt","userId"]},
      through: {
        attributes: ['read',"id"],
        where: {
          read
        }
      },
    }]
  })
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})
userRouter.put('/:id', async (req,res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        user.username = req.body.username
        await user.save()
        res.status(204).end()
      } else {
        res.status(404).end()
      }
})
userRouter.delete('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
      await user.destroy()
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  })
module.exports = userRouter