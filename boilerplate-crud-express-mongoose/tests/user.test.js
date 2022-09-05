const request = require('supertest')
const app = require('../server')

const { connectDb, dropAndCloseDb } = require('../db.connection')

let idFirstElement = null

beforeAll(async () => {
  await connectDb()
})

it('endpoint not found', async () => {
  await request
    .agent(app)
    .get('/api')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(data.message).toContain('Unknown endpoint')
    })
})

it('add new user', async () => {
  await request
    .agent(app)
    .post('/api/users')
    .send({ name: 'Test', surname: 'User' })
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data.message).toContain('Created')
    })
})

it('missing name field on create new user', async () => {
  await request
    .agent(app)
    .post('/api/users')
    .send({ name: 'Test' })
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(500)
      expect(data.message).toContain('Missing surname')
    })
})

it('missing surname field on create new user', async () => {
  await request
    .agent(app)
    .post('/api/users')
    .send({ surname: 'Test' })
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(500)
      expect(data.message).toContain('Missing name')
    })
})

it('get list of users', async () => {
  await request
    .agent(app)
    .get('/api/users')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data).toHaveLength(1)
      expect(data[0].name).toBe('Test')

      idFirstElement = data[0].id
    })
})

it('search Test user by name', async () => {
  await request
    .agent(app)
    .get('/api/users?name=Test')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data).toHaveLength(1)
      expect(data[0].name).toBe('Test')
    })
})

it('search Test user by surname', async () => {
  await request
    .agent(app)
    .get('/api/users?surname=User')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data).toHaveLength(1)
      expect(data[0].surname).toBe('User')
    })
})

it('search Test user by status', async () => {
  await request
    .agent(app)
    .get('/api/users?status=1')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data).toHaveLength(0)
    })
})

it('update user data', async () => {
  await request
    .agent(app)
    .get('/api/users?surname=User')
    .expect('Content-Type', /json/)
    .then(async (response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data).toHaveLength(1)
      expect(data[0].surname).toBe('User')

      await request
        .agent(app)
        .put(`/api/users/${data[0].id}`)
        .send({
          name: 'John',
          surname: 'Doe'
        })
        .expect('Content-Type', /json/)
        .then((reply) => {
          const replyData = JSON.parse(reply.text)
          expect(reply.status).toBe(200)
          expect(replyData.message).toContain('Updated')
        })
    })
})

it('get by id', async () => {
  await request
    .agent(app)
    .get(`/api/users/${idFirstElement}`)
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data.name).toBe('John')
      expect(data.surname).toBe('Doe')
    })
})

it('get by wrong id', async () => {
  await request
    .agent(app)
    .get('/api/users/630e44cfad30948ba1111111')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(data.message).toBe('Item not found')
    })
})

it('get by not valid id', async () => {
  await request
    .agent(app)
    .get('/api/users/123')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(500)
      expect(data.message).toBe('Item ID not valid')
    })
})

it('try to update by not valid id', async () => {
  await request
    .agent(app)
    .put('/api/users/123')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(500)
      expect(data.message).toBe('Item ID not valid')
    })
})

it('try to update by wrong id', async () => {
  await request
    .agent(app)
    .put('/api/users/630e44cfad30948ba1111111')
    .send({ name: 'Wario' })
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(data.message).toBe('Item not found')
    })
})

it('try to delete by not valid id', async () => {
  await request
    .agent(app)
    .delete('/api/users/123')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(500)
      expect(data.message).toBe('Item ID not valid')
    })
})

it('try to delete by wrong id', async () => {
  await request
    .agent(app)
    .delete('/api/users/630e44cfad30948ba1111111')
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(404)
      expect(data.message).toBe('Item not found')
    })
})

it('delete an item', async () => {
  await request
    .agent(app)
    .delete(`/api/users/${idFirstElement}`)
    .expect('Content-Type', /json/)
    .then((response) => {
      const data = JSON.parse(response.text)
      expect(response.status).toBe(200)
      expect(data.message).toBe('Deleted')
    })
})

afterAll(async () => {
  await dropAndCloseDb()
})
