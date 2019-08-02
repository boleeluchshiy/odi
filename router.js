const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.index)
router.get('/about', controller.about)
router.get('/contacts', controller.contacts)

router.use('/user', require('./user/router'))

module.exports = router
