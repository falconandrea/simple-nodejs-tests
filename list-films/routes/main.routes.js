const express = require('express')

const router = express.Router()

const filmController = require('../controllers/film.controller')

router.get('/', filmController.renderList)

module.exports = router
