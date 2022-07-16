const tap = require('tap')
require('dotenv').config()
const { MongoClient } = require('mongodb')
const app = require('../server')

tap.before(() => {
  MongoClient.connect(process.env.MONGO_URI_TEST, (error, client) => {
    if (error) console.log(error)

    const db = client.db('fastify-test')
    db.collection('authors').deleteMany({}, (err, result) => {
      if (err) console.log(err)
    })
  })
})

tap.only('books tests', async (t) => {
  /* LIST WITHOUT DATA */
  t.test('get list without data', async (test) => {
    test.plan(2)

    const response = await app.inject({
      method: 'GET',
      url: '/api/author'
    })

    test.equal(response.statusCode, 200)
    console.log('ASDASDASDASD', response.json())
    test.equal(response.json().length, 0)
  })

  /* CREATE */
  t.test('create new author', async (test) => {
    test.plan(2)

    const response = await app.inject({
      method: 'POST',
      url: '/api/author',
      payload: {
        name: 'Mario',
        surname: 'Rossi'
      }
    })

    test.equal(response.statusCode, 200)
    test.ok(response.json().id, 'insertedId returned')
  })

  t.test('create new author with missing field', async (test) => {
    test.plan(2)

    const response = await app.inject({
      method: 'POST',
      url: '/api/author',
      payload: {
        surname: 'Rossi'
      }
    })

    test.equal(response.statusCode, 400)
    test.equal(
      response.json().message,
      "body must have required property 'name'"
    )
  })

  t.test('create new author with missing field', async (test) => {
    test.plan(2)

    const response = await app.inject({
      method: 'POST',
      url: '/api/author',
      payload: {
        name: 'Mario'
      }
    })

    test.equal(response.statusCode, 400)
    test.equal(
      response.json().message,
      "body must have required property 'surname'"
    )
  })

  /* LIST */
  t.test('get list', async (test) => {
    test.plan(2)

    const response = await app.inject({
      method: 'GET',
      url: '/api/author'
    })

    test.equal(response.statusCode, 200)
    test.equal(response.json().length, 1)
  })

  /* GET */
  t.test('get detail', async (test) => {
    test.plan(2)

    const response = await app.inject({
      method: 'GET',
      url: '/api/author'
    })

    const id = response.json()[0]._id

    const detail = await app.inject({
      method: 'GET',
      url: `/api/author/${id}`
    })

    test.equal(detail.statusCode, 200)
    test.equal(detail.json()._id, id)
  })

  t.test('get detail not in db', async (test) => {
    test.plan(2)

    const data = '12a34b2392cfee8293d12345'
    const response = await app.inject({
      method: 'GET',
      url: `/api/author/${data}`
    })
    test.equal(response.statusCode, 500)
    test.equal(response.json().message, 'Item not found')
  })

  /* REMOVE */
  t.test('try to remove an element not in db', async (test) => {
    test.plan(2)

    const userToDelete = '12a34b2392cfee8293d12345'
    const response = await app.inject({
      method: 'DELETE',
      url: `/api/author/${userToDelete}`
    })
    test.equal(response.statusCode, 500)
    test.equal(response.json().message, 'Item not found')
  })

  t.test('remove item', async (test) => {
    test.plan(2)

    const response = await app.inject({
      method: 'GET',
      url: '/api/author'
    })

    const id = response.json()[0]._id

    const detail = await app.inject({
      method: 'DELETE',
      url: `/api/author/${id}`
    })

    test.equal(detail.statusCode, 200)
    test.match(detail.json(), { message: 'Deleted' })
  })
})
