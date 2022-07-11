const controller = require('../controllers/author.controller')

async function routes (fastify, options) {
  fastify.get('/author', controller.list)

  const bodyJsonSchema = {
    type: 'object',
    required: ['name', 'surname'],
    properties: {
      name: { type: 'string' },
      surname: { type: 'string' }
    }
  }
  fastify.post('/author', { body: bodyJsonSchema }, controller.create)
  fastify.delete('/author/:id', controller.remove)
}

module.exports = routes
