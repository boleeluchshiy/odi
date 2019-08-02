const express = require('express')
const router = express.Router()
const controller = require('./controller')

//    mw
const validateRegister = require('./mw/validateRegister')
const validateLogin = require('./mw/validateLogin')
const authenticate = require('./mw/authenticate')
const loginRequired = require('./mw/loginRequired')

// urlpatterns

//    авторизация приложений
const passport = require('passport')

router.get(
   '/auth/google',
   passport.authenticate('google', { scope: ['profile', 'email'] }),
)

router.get(
   '/auth/google/callback',
   passport.authenticate('google', { failureRedirect: '/login' }),
   function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
   },
)

router.get('/register', controller.register)
router.post('/register', validateRegister, controller.register__post)

router.get('/login', controller.login)
router.post('/login', [validateLogin, authenticate], controller.login__post)

router.get('/logout', controller.logout)

router.get('/:username', [loginRequired], controller.dashboard)

//
module.exports = router
