const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get('/', userController.list)
router.post('/', userController.create)
router.delete('/:id', userController.remove)

module.exports = router
