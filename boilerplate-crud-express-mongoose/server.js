const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

const userRoutes = require('./routes/user.routes')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/users', userRoutes)

app.use((req, res) => {
  res.status(404).send('Unknown endpoint')
})

module.exports = app
