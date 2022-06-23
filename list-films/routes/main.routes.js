const express = require('express')
const router = express.Router()
const path = require('path')
const ejs = require('ejs')

router.get('/', (req, res) => {
  res.render('pages/list')
})

module.exports = router
