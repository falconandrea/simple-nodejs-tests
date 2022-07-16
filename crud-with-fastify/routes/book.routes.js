const controller = require('../controllers/book.controller')

async function routes(fastify, options) {
  fastify.get(
    'book',
    {
      schema: {
        description: 'Get list of books',
        tags: ['book'],
        response: {
          200: {
            description: 'Successful response',
            type: 'array',
            properties: {
              _id: { type: 'string', description: 'entity id' },
              title: { type: 'string' },
              year: { type: 'number' },
              authors: { type: 'array' }
            }
          }
        }
      }
    },
    controller.list
  )

  fastify.get(
    'book/:id',
    {
      schema: {
        description: 'Get detail of a book',
        tags: ['book'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'book id'
            }
          }
        },
        response: {
          200: {
            description: 'Successful response',
            type: 'object',
            properties: {
              _id: { type: 'string', description: 'entity id' },
              title: { type: 'string' },
              year: { type: 'number' },
              authors: { type: 'array' }
            }
          }
        }
      }
    },
    controller.get
  )

  const bodyJsonSchema = {
    type: 'object',
    required: ['title', 'year', 'authors'],
    properties: {
      title: { type: 'string' },
      year: { type: 'number' },
      authors: { type: 'array' }
    }
  }
  fastify.post(
    'book',
    {
      schema: {
        description: 'Add a new book',
        tags: ['book'],
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
    'book/:id',
    {
      schema: {
        description: 'Delete a book',
        tags: ['book'],
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'book id'
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
