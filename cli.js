const { Sequelize, QueryTypes } = require('sequelize')
const sequelize = new Sequelize('postgres://user:salasana@localhost:5432/postgres')

const main = async () => {
    try {
      await sequelize.authenticate()
      const blogs = await sequelize.query('SELECT * FROM blogs;', {
        type: QueryTypes.SELECT,
    });
    console.log(blogs)
    sequelize.close()
    }catch(error){
      console.error('Unable to connect to the database:', error)
    }
  }
  
main()