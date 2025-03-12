const blogsRouter = require('express').Router()
const { User,Blogs } = require('../models')
const {Op} = require('sequelize')
const userExtractor = require('../utils/userExtractor')
const tokenExtractor = require('../utils/tokenExtractor')
const sessionChecker = require('../utils/sessionChecker')
const {sequelize} = require('../utils/db')

blogsRouter.get('/', async (req, res) => {
  let where = {}
  if (req.query.search) {
    where = {
      [Op.or]: [
        {
          title:{[Op.substring]: req.query.search}
        },
        {
          author:{[Op.substring]: req.query.search}
        }
      ]
    }   
  }


  
    
  
  const blogs = await Blogs.findAll({
      attributes: { exclude: ['user_id',"userId"] },
      include: {
        model: User,
        attributes: ['name','username','id']
      },
      where
      ,
      order: [
      ['likes', 'DESC'],
      sequelize.fn('max', sequelize.col('likes')),
      ],
      group: ['blogs.id',"user.name","user.username","user.id"]
    })
  console.log(JSON.stringify(blogs))
  res.json(blogs)
})

blogsRouter.post('/',tokenExtractor,userExtractor,sessionChecker, async (req, res) => {
    console.log(req.body)
    const user = req.user
    const body = req.body
    const blog = await Blogs.create({...body,userId:user.id})
    res.json(blog).end()

})

const blogFinder = async (req, res, next) => {
    req.blog = await Blogs.findByPk(req.params.id)
    next()
  }
blogsRouter.delete('/:id',blogFinder,tokenExtractor,userExtractor,sessionChecker, async (req, res) => {
  console.log(req.blog)
  console.log(req.user)
  if (req.blog && req.blog.userId === req.user.id){
    await req.blog.destroy()
    res.status(204).end()
  }
  res.status(400).json({error:"Unauthorized user"})
})
blogsRouter.put('/:id',blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog).end
    
    
})
module.exports = blogsRouter