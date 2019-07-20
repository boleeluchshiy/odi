exports.index = (req, res) => {
   console.log('\n', `🙋  > req.method: `, req.method)
   const content = {
      title: 'Amin panel',
   }

   return res.render('index', content)
}

exports.panel = (req, res) => {
   const content = {
      title: 'Panel',
   }

   return res.render('index', content)
}
