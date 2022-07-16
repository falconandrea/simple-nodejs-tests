const t = require('tap')
require('dotenv').config()
const { MongoClient } = require('mongodb')
const app = require('../server')

t.before(() => {
  MongoClient.connect(process.env.MONGO_URI_TEST, (error, client) => {
    if (error) console.log(error)

    const db = client.db('fastify-test')
    db.collection('authors').deleteMany({}, (error, result) => {
      if (error) console.log(error)
    })
  })
})

/* LIST WITHOUT DATA */
t.test('get list without data', async t => {
  t.plan(2)

  const response = await app.inject({
    method: 'GET',
    url: '/api/author'
  })

  t.equal(response.statusCode, 200)
  t.equal(response.json().length, 0)
})

/* CREATE */
t.test('create new author', async t => {
  t.plan(2)

  const response = await app.inject({
    method: 'POST',
    url: '/api/author',
    payload: {
      name: 'Mario',
      surname: 'Rossi'
    }
  })

  t.equal(response.statusCode, 200)
  t.ok(response.json().id, 'insertedId returned')
})

t.test('create new author with missing field', async t => {
  t.plan(2)

  const response = await app.inject({
    method: 'POST',
    url: '/api/author',
    payload: {
      surname: 'Rossi'
    }
  })

  t.equal(response.statusCode, 500)
  t.equal(response.json().message, 'Missing name')
})

t.test('create new author with missing field', async t => {
  t.plan(2)

  const response = await app.inject({
    method: 'POST',
    url: '/api/author',
    payload: {
      name: 'Mario'
    }
  })

  t.equal(response.statusCode, 500)
  t.equal(response.json().message, 'Missing surname')
})

/* LIST */
t.test('get list', async t => {
  t.plan(2)

  const response = await app.inject({
    method: 'GET',
    url: '/api/author'
  })

  t.equal(response.statusCode, 200)
  t.equal(response.json().length, 1)
})

/* GET */
t.test('get detail', async t => {
  t.plan(2)

  const response = await app.inject({
    method: 'GET',
    url: '/api/author'
  })

  const id = response.json()[0]._id

  const detail = await app.inject({
    method: 'GET',
    url: `/api/author/${id}`
  })

  t.equal(detail.statusCode, 200)
  t.equal(detail.json()._id, id)
})

t.test('get detail not in db', async t => {
  t.plan(2)

  const data = '12a34b2392cfee8293d12345'
  const response = await app.inject({
    method: 'GET',
    url: `/api/author/${data}`
  })
  t.equal(response.statusCode, 500)
  t.equal(response.json().message, 'Item not found')
})

/* REMOVE */
t.test('try to remove an element not in db', async t => {
  t.plan(2)

  const userToDelete = '12a34b2392cfee8293d12345'
  const response = await app.inject({
    method: 'DELETE',
    url: `/api/author/${userToDelete}`
  })
  t.equal(response.statusCode, 500)
  t.equal(response.json().message, 'Item not found')
})

t.test('remove item', async t => {
  t.plan(2)

  const response = await app.inject({
    method: 'GET',
    url: '/api/author'
  })

  const id = response.json()[0]._id

  const detail = await app.inject({
    method: 'DELETE',
    url: `/api/author/${id}`
  })

  t.equal(detail.statusCode, 200)
  t.match(detail.json(), { message: 'Deleted' })
})
