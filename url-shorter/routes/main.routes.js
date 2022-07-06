const express = require('express')

const router = express.Router()

const controller = require('../controllers/url.controller')

router.get('/', (req, res) => {
  res.render('pages/home')
})
router.get('/:code([0-9A-Za-z]{10})', controller.redirectUrl)

module.exports = router
