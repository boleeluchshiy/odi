const path = require('path')
const config = require('config')

const connectDB = require('../config/db')
connectDB()

const express = require('express')
const app = express()
//чтобы в шаблонах можно было указвать абсолютный путь
app.locals.basedir = path.join(__dirname, 'templates')

// middleware
app.use(express.json({ extended: false }))
app.use(express.urlencoded({ extended: false }))

// engines
app.set('view engine', 'pug')
app.set('views', './admin/templates')

// static
app.use(express.static('static'))

//    routes
app.use('/', require('./urls'))

module.exports = app
