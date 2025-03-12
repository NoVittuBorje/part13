const logger = require('./logger')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
const errorHandler = (error, request, response, next) => {
    console.log(error)
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    }else if (request.header('Authorization') === ''){
      return response.status(400).json({ error: 'token empty' })
    }else if (error.name === "SequelizeValidationError"){
        return response.status(400).json({error: error.message})
    }else if (error.name === "SequelizeDatabaseError"){
        return response.status(400).json({error:error})
    }else if (error.name === "SequelizeUniqueConstraintError"){
        return response.status(400).json({error:error.message})
    }else if (error.name === "SequelizeUniqueConstraintError"){
      return response.status(400).json({error:error.message})
  }
  
  
    next(error)
  }
  
module.exports = {
    unknownEndpoint,
    errorHandler,
    requestLogger
}