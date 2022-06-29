const express = require('express')

const router = express.Router()

const filmController = require('../controllers/film.controller')

router.get('/', filmController.renderList)

router.post('/new-film', filmController.addNewFilmFromForm)

router.post('/delete-film/:id', filmController.deleteFilmFromList)

module.exports = router
