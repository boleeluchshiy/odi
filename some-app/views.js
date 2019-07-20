exports.index = (req, res) => {
   console.log('\n', `🙋  > req.method: `, req.method)
   const content = {
      title: 'Тестовая страница',
   }

   return res.render('some-app/test', content)
}

exports.third = (req, res) => {
   console.log('\n', `🙋  > req.method: `, req.method)
   if (req.method === 'POST') {
      res.send('POST')
   }
   const content = {
      title: 'Третья',
   }

   // return res.render('some-app/third', content)
   return res.render('some-app/third', content)
}

exports.other = (req, res) => {
   const content = {
      title: 'Другая тестовая страница',
   }
   console.log('\n', `🙋  > req.method: `, req.method)
   return res.render('some-app/other', content)
}

exports.home = (req, res) => {
   return res.redirect('/')
}
