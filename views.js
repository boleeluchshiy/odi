exports.index = (req, res) => {
   const content = {
      title: 'Оди',
   }

   return res.render('index', content)
}
