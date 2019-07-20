const express = require('express')
const router = express.Router()

const views = require('./views')

router.get('/', views.index)
router.get('/panel', views.panel)

module.exports = router
