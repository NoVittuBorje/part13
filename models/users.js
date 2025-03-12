const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password_hash:{
    type: DataTypes.STRING,
    allowNull:false,
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
}, {
  sequelize,
  underscored: true,
  modelName: 'users'
})

module.exports = User