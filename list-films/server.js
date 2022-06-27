const express = require('express')

const app = express()
const path = require('path')
const bodyParser = require('body-parser')

const mainRoutes = require('./routes/main.routes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

const urlEncodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlEncodedParser)

app.use('/', mainRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
