const { User } = require('./models')
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/default')

exports.dashboard = function(req, res) {
   return res.render('user/dashboard')
}

exports.register = function(req, res) {
   return res.render('user/register')
}

exports.register__post = async function(req, res) {
   const { username, email, password } = req.body
   const details = { username, email, password }
   const content = { details }

   console.log(`\n🙋  > controller`)

   try {
      const user = User({ username, email, password })

      //шифруем пароль
      const salt = await bcryptjs.genSalt(10)
      user.password = await bcryptjs.hash(password, salt)

      user.save()

      console.log(`\n🙋  > Логиню`)
      req.login(user, function(err) {
         if (err) return next(err)

         return res.redirect('/user/dashboard')
         // return res.redirect('/users/' + req.user.username)
      })
   } catch (err) {
      console.log(`\n🐶  > Ошибка сервера: ${err.message}`)
      return res.send('Ошибка сервера')
   }
}

exports.login = function(req, res) {
   console.log(`\n🙋  > req.user: `, req.user)
   return res.render('user/login')
}

exports.login__post = async function(req, res) {}

exports.logout = (req, res) => {
   req.logout()
   return res.redirect('/')
}
