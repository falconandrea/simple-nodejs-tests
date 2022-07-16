const fastify = require('fastify')({
  logger: true
})

fastify.register(require('./db.connection'))

// Register the plugin before your routes
fastify.register(require('@fastify/swagger'), {
  exposeRoute: true,
  routePrefix: '/documentation',
  swagger: {
    info: { title: 'Books and Authors API' }
  },
  tags: [
    { name: 'author', description: 'Author endpoints' },
    { name: 'book', description: 'Books endpoints' }
  ]
})

fastify.register(require('./routes/author.routes'), { prefix: '/api/' })

module.exports = fastify
