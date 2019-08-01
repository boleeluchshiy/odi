exports.index = (req, res) => {
   const content = {
      title: 'Админище',
   }

   return res.render('index', content)
}

exports.panel = (req, res) => {
   const content = {
      title: 'Панель админа',
   }

   return res.render('index', content)
}
