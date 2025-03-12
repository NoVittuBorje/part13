const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Sessions extends Model {}

Sessions.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
    },
    token:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'active_sessions'
})
module.exports = Sessions