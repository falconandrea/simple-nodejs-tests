const request = require('supertest')
const app = require('../server')

describe('Test API endpoints', () => {
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
