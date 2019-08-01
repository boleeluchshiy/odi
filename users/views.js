const { User } = require('../user/models')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

exports.index = async (req, res) => {
   const content = {
      title: 'Все пользователи',
   }
   return res.send('Все пользователи.')
}

//Форма регистрации
exports.create = async (req, res) => {
   const content = {
      title: 'Создание нового пользователя',
   }

   if (req.method === 'POST') {
      const errors = validationResult(req).array()
      if (errors.length > 0) {
         content.errors = errors

         return res.render('users/create', content)
      }

      const { username, email, password } = req.body
      let user = await User.findOne({ email })

      //Если пользователь с таким email уже существует
      if (user) {
         content.errors = [
            { msg: `Пользователь с почтой ${email} уже существует.` },
         ]
         content.detail = { username, email, password }

         return res.render('users/create', content)
      }

      user = User({ username, email, password })

      //хэшируем пароль
      const salt = await bcryptjs.genSalt(10)
      user.password = await bcryptjs.hash(password, salt)

      await user.save()

      //выписываем токен
      const payload = {
         user: { id: user.id },
      }
      const secret = config.get('jwtSecret')
      const expiresIn = config.get('jwtExpiresIn')

      jwt.sign(payload, secret, { expiresIn }, (err, token) => {
         if (err) {
            console.log('\n', `🐶  > Ошибка сервера: ${err.message}`)
            return res.send('Ошибка сервера при подписании токена.')
         }
         console.log('\n', `🙋  > token: `, token)

         req.session.token = token
         console.log('\n', `🙋  > after req.session`)

         return res.redirect(`/${username}/`)
      })
   }

   return res.render('users/create', content)
}
