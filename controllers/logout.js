const logoutRouter = require('express').Router()
const userExtractor = require('../utils/userExtractor')
const tokenExtractor = require('../utils/tokenExtractor')
const sessionChecker = require('../utils/sessionChecker')
const { Sessions } = require('../models')


logoutRouter.delete('/',tokenExtractor,userExtractor,sessionChecker, async (req , res) => {
    console.log(req.user)
    const user = req.user
    const session = await Sessions.findOne({ where: { user_id:user.id, active:true} })
    console.log(session)
    if (!session){
        res.status(400).json({message:"no active sessions"})
    }
    session.active = false
    await session.save()
    res.status(200).json({message:"logged out"})
})
module.exports = logoutRouter