const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./db.connection'))
fastify.register(require('./routes/author.routes'))

module.exports = fastify
