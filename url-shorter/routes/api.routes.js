const express = require('express')

const router = express.Router()

const controller = require('../controllers/url.controller')

router.get('/url', controller.getList)
router.post('/url', controller.create)
router.delete('/url/:id', controller.remove)

module.exports = router
