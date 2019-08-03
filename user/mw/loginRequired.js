module.exports = function loginRequired(req, res, next) {
   if (req.isAuthenticated()) return next()
   //Сохраняем target-url (куда пользователь хотел попасть до того, как его
   //перекинуло на /login)
   req.session.targetUrl = req.originalUrl

   req.flash('error_msg', 'Залогиньтесь')
   return res.redirect('/user/login')
}
