const request = require('supertest')
const app = require('../server')

const { connectDb, dropAndCloseDb } = require('../db.connection')

beforeAll(async () => {
  await connectDb()
})

it('endpoint not found', async () => {
  await request
    .agent(app)
    .get('/api')
    .expect('Content-Type', /json/)
    .then(response => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(data.message).toContain('Unknown endpoint')
    })
})

afterAll(async () => {
  await dropAndCloseDb()
})
