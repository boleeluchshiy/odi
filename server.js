const path = require('path')
const config = require('config')

const connectDB = require('./config/db')
connectDB()

const express = require('express')
const server = express()
//чтобы в шаблонах можно было указвать абсолютный путь
server.locals.basedir = path.join(__dirname, 'templates')

// middleware
server.use(express.json({ extended: false }))
server.use(express.urlencoded({ extended: false }))

// engines
server.set('view engine', 'pug')
server.set('views', './templates')

// static
server.use(express.static('static'))

//    routes
// server.get('/', (req, res) => res.send('WTF'))
server.use('/', require('./urls'))

// api

const PORT = process.env.PORT || config.get('PORT')
server.listen(PORT, () => {
   return console.log(
      '\n',
      `🙋  > Сервер запущен: http://localhost:${PORT}`,
   )
})
