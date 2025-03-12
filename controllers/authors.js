const authorRouter = require('express').Router()
const { User,Blogs } = require('../models')
const { Sequelize, QueryTypes,Op} = require('sequelize')
const userExtractor = require('../utils/userExtractor')
const tokenExtractor = require('../utils/tokenExtractor')
const sessionChecker = require('../utils/sessionChecker')
const {sequelize} = require('../utils/db')

authorRouter.get('/',tokenExtractor,userExtractor,sessionChecker, async (req,res) => {
    const authors = await Blogs.findAll({
        attributes: [
            "author",
            [sequelize.fn("count",sequelize.col("author")), "articles"],
            [sequelize.fn("sum", sequelize.col("likes")), "total_likes"],
          ],
        order:[
            ["total_likes","DESC"]
        ],
        group:["author"]
    })
    res.json(authors)
})

module.exports = authorRouter