const readingRouter = require('express').Router()
const { User,Blogs,Readinglist } = require('../models')
const { Sequelize, QueryTypes,Op} = require('sequelize')
const userExtractor = require('../utils/userExtractor')
const tokenExtractor = require('../utils/tokenExtractor')
const {sequelize} = require('../utils/db')
const sessionChecker = require('../utils/sessionChecker')

readingRouter.get("/",tokenExtractor,userExtractor,sessionChecker,async(req,res) => {
    const result = await Readinglist.findAll({attributes: { exclude: ['id'] },})
    res.status(200).json(result)
})

readingRouter.post("/",tokenExtractor,userExtractor,sessionChecker,async(req,res) => {
    const body = req.body
    const blog = await Blogs.findByPk(body.blogId)
    if (req.user.id === body.userId){
        const reading = await Readinglist.create({userId:req.user.id,blogId:blog.id})
        res.status(200).json(reading)
    }
    res.status(400).json({error:"wrong user"})
})
readingRouter.put('/:id',tokenExtractor,userExtractor,sessionChecker,async(req,res) => {
    const blog_id = req.params.id
    const body = req.body
    console.log(body,blog_id,req.user.name)
    const read = await Readinglist.findByPk(blog_id)
    if (req.user.id === read.userId){
    read.read = body.read
    await read.save()
    res.status(200).json(read)
    }
    res.status(400).json({error:"wrong user"})
})
module.exports = readingRouter