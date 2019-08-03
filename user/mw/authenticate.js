const config = require('../../config/default')
const passport = require('passport')

module.exports = function authenticate(req, res, next) {
   // После авторизации перекидываем туда, куда пользователь собирался изначально,
   let successRedirect = req.session.targetUrl || '/user/dashboard'
   // а targetUrl после использования разрушается
   req.session.targetUrl = undefined

   return passport.authenticate('local', {
      successRedirect,
      failureRedirect: config.loginUrl,
      // failureFlash: true,
   })(req, res, next)
}
