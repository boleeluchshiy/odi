const passport = require('passport')

module.exports = function authenticate(req, res, next) {
   return passport.authenticate('local', {
      successRedirect: '/user/dashboard',
      failureRedirect: '/user/login',
      failureFlash: true,
   })(req, res, next)
}
