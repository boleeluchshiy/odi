const { User } = require('../models')
const { isEmail, isLength, isEmpty } = require('validator')

module.exports = async function validateRegister(req, res, next) {
   const { username, email, password } = req.body
   const details = { username, email, password }
   const content = { details }

   let errors = checkReegisterForm(username, email, password)
   if (errors.length) {
      content.errors = errors
      return res.render('user/register', content)
   }

   //check usename
   let user = await User.findOne({ username }).exec()
   if (user) {
      content.errors = [{ param: 'username', msg: 'Занято.' }]
      return res.render('user/register', content)
   }

   //check email
   user = await User.findOne({ email }).exec()
   if (user) {
      content.errors = [{ param: 'email', msg: 'Занято.' }]
      return res.render('user/register', content)
   }

   return next()
}

//
function checkReegisterForm(username, email, password) {
   const errors = []

   if (isEmpty(username))
      errors.push({
         param: 'username',
         msg: 'Имя пользователя обязательно.',
      })

   if (!isEmail(email))
      errors.push({ param: 'email', msg: 'Некорректный email.' })

   if (!isLength(password, { min: 3 }))
      errors.push({
         param: 'password',
         msg: 'Пароль должен быть не менее 3 символов.',
      })

   return errors
}
