const { User } = require('../models')
const { isEmpty } = require('validator')
const bcryptjs = require('bcryptjs')

module.exports = async function validateLogin(req, res, next) {
   const { email, password } = req.body
   const details = { email, password }
   const content = { details }

   let errors = checkLoginForm(email, password)
   if (errors.length) {
      content.errors = errors
      return res.render('user/login', content)
   }

   //check email
   let user = await User.findOne({ email }).exec()
   if (!user) {
      content.errors = [{ param: 'email', msg: 'Пользователя не существует.' }]
      return res.render('user/login', content)
   }

   //check password
   const isPassword = await bcryptjs.compare(password, user.password)

   if (!isPassword) {
      content.errors = [{ param: 'password', msg: `Неверный пароль.` }]
      return res.status(400).render('user/login', content)
   }

   console.log(`\n🙋  > Валидация пройдена.`)
   return next()
}

//
function checkLoginForm(email, password) {
   const errors = []

   if (isEmpty(email))
      errors.push({
         param: 'email',
         msg: 'Не указан email.',
      })

   if (isEmpty(password))
      errors.push({
         param: 'password',
         msg: 'Не указан пароль.',
      })

   return errors
}
