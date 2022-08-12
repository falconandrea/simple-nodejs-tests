const express = require('express')

const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const mainRoutes = require('./routes/main.routes')
const apiRoutes = require('./routes/api.routes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', mainRoutes)
app.use('/api', apiRoutes)

app.use((req, res) => {
  res.status(404).send('Unknown endpoint')
})

module.exports = app
