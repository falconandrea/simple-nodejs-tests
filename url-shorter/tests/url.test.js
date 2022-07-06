const request = require('supertest')
const app = require('../server')

describe('Test front-end endpoints', () => {
  it('check home', async () => {
    await request
      .agent(app)
      .get('/')
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('text/html')
        expect(response.text).toContain('URL to shorten')
      })
  })
})

describe('Test API endpoints', () => {
  beforeAll(async () => {
    const URL = require('../models/url.model')

    // Delete all from table tests
    await URL.deleteMany({}).exec()
  })

  it('add new url', async () => {
    await request
      .agent(app)
      .post('/api/url')
      .send({
        originalUrl: 'https://google.it'
      })
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.originalUrl).toBe('https://google.it')
      })
  })

  it('add new film without originalUrl', async () => {
    await request
      .agent(app)
      .post('/api/url')
      .send({})
      .expect((response) => {
        expect(response.status).toBe(500)
        expect(response.text).toContain('Missing originalUrl')
      })
  })

  it('get list', async () => {
    await request
      .agent(app)
      .get('/api/url')
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveLength(1)
      })
  })

  it('check redirect', async () => {
    const urlSearched = 'https://google.it'
    const controller = require('../controllers/url.controller')
    const data = await controller.findByOriginalURL(urlSearched)

    await request
      .agent(app)
      .get(`/${data.code}`)
      .expect((response) => {
        expect(response.statusCode).toBe(302)
        expect(response.headers.location).toBe(urlSearched)
      })
  })

  it('delete a url', async () => {
    const urlSearched = 'https://google.it'
    const controller = require('../controllers/url.controller')
    const data = await controller.findByOriginalURL(urlSearched)

    await request
      .agent(app)
      .delete(`/api/url/${data.id}`)
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Deleted')
      })
  })

  it('delete a url with wrong id', async () => {
    await request
      .agent(app)
      .delete('/api/url/62bc8747de2202dba8904293')
      .expect((response) => {
        expect(response.status).toBe(404)
        expect(response.text).toContain('URL not found')
      })
  })
})
