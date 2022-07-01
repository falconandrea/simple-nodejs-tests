const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)

describe('Test front-end endpoints', () => {
  beforeAll(async () => {
    const Film = require('../models/film.model')

    // Delete all from table tests
    await Film.deleteMany({}).exec()

    // Insert film for test list endpoint
    const rest = await request
      .post('/new-film')
      .send('title=Random string test&year=9999')
  })

  it('list films', async () => {
    const res = await request.get('/').expect((response) => {
      expect(response.status).toBe(200)
      expect(response.type).toBe('text/html')
      expect(response.text).toContain('Random string test')
    })
  })

  it('add new film', async () => {
    const res = await request
      .post('/new-film')
      .send('title=New film test&year=2021')
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.type).toBe('text/html')
        expect(response.text).toContain('Random string test')
        expect(response.text).toContain('New film test')
      })
  })

  it('add new film without year', async () => {
    const res = await request
      .post('/new-film')
      .send('title=Film without year')
      .expect((response) => {
        expect(response.status).toBe(500)
        expect(response.text).toContain('Missing year')
      })
  })

  it('add new film without title', async () => {
    const res = await request
      .post('/new-film')
      .send('year=1980')
      .expect((response) => {
        expect(response.status).toBe(500)
        expect(response.text).toContain('Missing title')
      })
  })

  it('delete a film', async () => {
    const titleFilm = 'New film test'
    const filmController = require('../controllers/film.controller')
    const film = await filmController.findByTitle(titleFilm)

    const res = await request
      .post(`/delete-film/${film.id}`)
      .expect((response) => {
        expect(response.status).toBe(200)
        expect(response.text).not.toContain(titleFilm)
      })
  })

  it('delete a film with wrong id', async () => {
    const res = await request
      .post('/delete-film/62bc8747de2202dba8904293')
      .expect((response) => {
        expect(response.status).toBe(500)
        expect(response.text).toContain('Film not found')
      })
  })
})
