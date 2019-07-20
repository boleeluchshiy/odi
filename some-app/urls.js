const express = require('express')
const router = express.Router()

const views = require('./views')

router.get('/', views.index)
router.get('/third', views.third)
router.get('/other', views.other)

module.exports = router
