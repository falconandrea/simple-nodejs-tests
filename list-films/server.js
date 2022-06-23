const express = require('express')
const app = express()

const mainRoutes = require('./routes/main.routes')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))
app.use('/', mainRoutes)

app.listen(3000)
