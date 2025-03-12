const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Blogs extends Model {}
const currentYear = new Date().getFullYear()
Blogs.init({
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    author: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes:{
    type: DataTypes.SMALLINT,
    defaultValue: 0
  },
  userId:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  },
  year:{
    type:DataTypes.INTEGER,
    validate:{
      min: 1991,
      max: currentYear,
  }
  },
},

   {
    sequelize,
    underscored: true,
    modelName: 'blogs'
})

module.exports = Blogs