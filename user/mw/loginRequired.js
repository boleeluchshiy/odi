module.exports = function loginRequired(req, res, next) {
   if (req.isAuthenticated()) return next()

   req.flash('error_msg', 'Залогиньтесь')
   return res.redirect('/user/login')
}
