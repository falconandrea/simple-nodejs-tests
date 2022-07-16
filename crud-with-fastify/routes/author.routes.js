const controller = require('../controllers/author.controller')

async function routes (fastify, options) {
  fastify.get(
    'author',
    {
      schema: {
        description: 'Get list of authors',
        tags: ['author'],
        response: {
          200: {
            description: 'Successful response',
            type: 'array',
            properties: {
              _id: { type: 'string', description: 'entity id' },
              name: { type: 'string' },
              surname: { type: 'string' }
            }
          }
        }
      }
    },
    controller.list
  )

  fastify.get(
    'author/:id',
    {
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
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              _id: { type: 'string', description: 'entity id' },
              name: { type: 'string' },
              surname: { type: 'string' }
            }
          }
        }
      }
    },
    controller.get
  )

  const bodyJsonSchema = {
    type: 'object',
    required: ['name', 'surname'],
    properties: {
      name: { type: 'string' },
      surname: { type: 'string' }
    }
  }
  fastify.post(
    'author',
    {
      schema: {
        description: 'Add a new author',
        tags: ['author'],
        body: bodyJsonSchema,
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              id: { type: 'string', description: 'entity id' }
            }
          }
        }
      }
    },
    controller.create
  )

  fastify.delete(
    'author/:id',
    {
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
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' }
            }
          }
        }
      }
    },
    controller.remove
  )
}

module.exports = routes
