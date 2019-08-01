const { User } = require('./models')

const { validationResult } = require('express-validator')

exports.index = async (req, res) => {
   const username = req.originalUrl.slice(1, -1)
   const content = {
      title: username,
   }
   if (req.session) content.token = req.session.token

   return res.send(content)
}
