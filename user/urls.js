const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const views = require('./views')

//Роут пользователя
router.get('/', views.index)

module.exports = router
