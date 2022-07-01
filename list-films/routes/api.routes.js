const express = require('express')

const router = express.Router()

const filmController = require('../controllers/film.controller')

router.get('/film', filmController.getList)
router.post('/film', filmController.create)
router.delete('/film/:id', filmController.remove)

module.exports = router
