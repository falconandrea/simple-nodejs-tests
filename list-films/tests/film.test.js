const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Test endpoints', () => {
  beforeAll(async () => {
    const Film = require('../models/film.model')

    // Delete all from table tests
    await Film.deleteMany({}).exec()

    // Insert film for test list endpoint
    const rest = await request.post('/new-film')
      .send('title=Random string test&year=9999')
  })

  it('list films', async () => {
    const res = await request.get('/')
      .expect(response => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('text/html')
        expect(response.text).toContain('Random string test')
      })
  })
})
