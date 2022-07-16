const controller = require('../controllers/author.controller')

async function routes (fastify, options) {
  fastify.get('author', {
    schema: {
      description: 'Get list of authors',
      tags: ['author']
    }
  }, controller.list)

  fastify.get('author/:id', {
    schema: {
      description: 'Get detail of an author',
      tags: ['author'],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'author id'
          }
        }
      }
    }
  }, controller.get)

  const bodyJsonSchema = {
    type: 'object',
    required: ['name', 'surname'],
    properties: {
      name: { type: 'string' },
      surname: { type: 'string' }
    }
  }
  fastify.post('author', {
    schema: {
      description: 'Add a new author',
      tags: ['author'],
      body: bodyJsonSchema
    }
  }, controller.create)

  fastify.delete('author/:id', {
    schema: {
      description: 'Delete an author',
      tags: ['author'],
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'author id'
          }
        }
      }
    }
  }, controller.remove)
}

module.exports = routes
