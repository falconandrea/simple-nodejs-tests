const request = require('supertest')
const app = require('../server')

describe('Test front-end endpoints', () => {
  beforeAll(async () => {
    const Film = require('../models/film.model')

    // Delete all from table tests
    await Film.deleteMany({}).exec()

    // Insert film for test list endpoint
    await request.agent(app).post('/api/film').send({
      title: 'Random string test',
      year: 9999
    })
  })

  it('list films', async () => {
    await request
      .agent(app)
      .get('/')
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('text/html')
        expect(response.text).toContain('Random string test')
      })
  })
})

describe('Test API endpoints', () => {
  it('add new film', async () => {
    await request
      .agent(app)
      .post('/api/film')
      .send({
        title: 'New film test',
        year: 2021
      })
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.title).toBe('New film test')
        expect(response.body.year).toBe(2021)
      })
  })

  it('add new film without year', async () => {
    await request
      .agent(app)
      .post('/api/film')
      .send({
        title: 'New film test'
      })
      .expect((response) => {
        expect(response.status).toBe(500)
        expect(response.text).toContain('Missing year')
      })
  })

  it('add new film without title', async () => {
    await request
      .agent(app)
      .post('/api/film')
      .send({
        year: 1980
      })
      .expect((response) => {
        expect(response.status).toBe(500)
        expect(response.text).toContain('Missing title')
      })
  })

  it('get list', async () => {
    await request
      .agent(app)
      .get('/api/film')
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body).toHaveLength(2)
      })
  })

  it('delete a film', async () => {
    const titleFilm = 'New film test'
    const filmController = require('../controllers/film.controller')
    const film = await filmController.findByTitle(titleFilm)

    await request
      .agent(app)
      .delete(`/api/film/${film.id}`)
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('application/json')
        expect(response.body.message).toBe('Deleted')
      })
  })

  it('delete a film with wrong id', async () => {
    await request
      .agent(app)
      .delete('/api/film/62bc8747de2202dba8904293')
      .expect((response) => {
        expect(response.status).toBe(404)
        expect(response.text).toContain('Film not found')
      })
  })
})
