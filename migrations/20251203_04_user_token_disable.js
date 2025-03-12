const { DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

module.exports = {
  up: async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN(),
    defaultValue:false,
  })
  await queryInterface.createTable('active_sessions',{
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
    }
  })
},
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('users', 'disabled', {});
    await queryInterface.dropTable('active_sessions')
  },
}