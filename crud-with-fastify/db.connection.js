require('dotenv').config()

const fastifyPlugin = require('fastify-plugin')

async function dbConnector (fastify, options) {
  fastify.register(require('@fastify/mongodb'), {
    url:
      process.env.NODE_ENV === 'development'
        ? process.env.MONGO_URI
        : process.env.MONGO_URI_TEST
  })
}

module.exports = fastifyPlugin(dbConnector)
