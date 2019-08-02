//    db
const connectDB = require('./config/connectDB')()

const path = require('path')
const config = require('./config/default')
const express = require('express')
const server = express()

//    Middleware functions
server.use(express.json())
server.use(express.urlencoded({ extended: false }))

// session
const session = require('express-session')
server.use(
   session({
      secret: 'keyboard kitten',
      resave: true,
      saveUninitialized: true,
   }),
)

// passport
const passport = require('passport')
const passportLocal = require('./config/passport/local')(passport)

server.use(passport.initialize())
server.use(passport.session())

// flash
const flash = require('connect-flash')
server.use(flash())

// static
const STATIC = path.join(__dirname, 'public')
server.use(express.static(STATIC))

//    Template engine
server.set('view engine', 'pug')

//    Globals
server.use((req, res, next) => {
   // flash
   res.locals.success_msg = req.flash('success_msg')
   res.locals.error_msg = req.flash('error_msg')

   // passport
   res.locals.error = req.flash('error')
   res.locals.user = req.user || null

   // pug
   res.locals.basedir = path.join(__dirname, 'views')
   res.locals.url = req.url

   next()
})

//    expressServer
const PORT = process.env.PORT || config.PORT
const expressServer = server.listen(PORT, () =>
   console.log(`\n🙋  > http://localhost:${PORT}/`),
)

//    socket.io

//    urls
server.use(require('./router'))
