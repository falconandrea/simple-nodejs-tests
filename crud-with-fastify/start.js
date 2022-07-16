require('dotenv').config()
const fastify = require('./server')

const port = process.env.PORT || 3000
fastify.listen({ port }, (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is running on port ${port}.`)
})
