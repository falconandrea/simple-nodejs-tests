const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./db.connection'))

module.exports = fastify
