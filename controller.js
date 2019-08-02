exports.index = function index(req, res) {
   content = { title: 'index' }
   res.render('index', content)
}

exports.about = function about(req, res) {
   content = { title: 'about' }
   res.render('index', content)
}

exports.contacts = function contacts(req, res) {
   content = { title: 'contacts' }
   res.render('index', content)
}
