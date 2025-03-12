const Blogs = require('./blogs')
const User = require('./users')
const Readinglist = require('./readinglist')
const Sessions = require('./sessions')

Blogs.belongsTo(User)
User.hasMany(Blogs)


User.belongsToMany(Blogs, { through: Readinglist, as: 'readings' })
Blogs.belongsToMany(User, { through: Readinglist, as: 'reading_users' })




module.exports = {
  Blogs, User,Readinglist,Sessions
}