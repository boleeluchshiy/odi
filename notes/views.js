const { Note } = require('./models')

const { validationResult } = require('express-validator')

exports.index = async (req, res) => {
   const content = {
      title: 'Notes',
   }

   try {
      const notes = await Note.find()
      console.log('\n', `🙋  > notes: `, notes)

      content.notes = notes

      return res.render('notes/index', content)
   } catch (err) {
      console.log(
         '\n',
         `🐶  > Ошибка сервера при обращении к БД: ${err.message}`,
      )
      return res.send('Ошибка сервера')
   }
}

exports.getCreate = (req, res) => {
   console.log('\n', `🙋  > req.body: `, req.body)
   let content = {
      title: 'Создать',
   }

   return res.render('notes/create', content)
}

exports.postCreate = async (req, res) => {
   let { title, desc } = req.body

   //проверяем POST на ошибки
   const errors = validationResult(req).array()
   if (errors.length > 0) {
      const content = {
         method: 'POST',
         details: {
            title,
            desc,
         },
         errors,
      }

      return res.render('notes/create', content)
   }

   //Добавить в БД
   try {
      const note = Note({ title, desc })
      await note.save()
      return res.redirect('/notes')
   } catch (err) {
      console.log(
         '\n',
         `🐶  > Ошибка сервера при обращении к БД: ${err.message}`,
      )
      return res.send('Ошибка сервера')
   }
}

exports.delete = async (req, res) => {
   const { id } = req.params

   try {
      const note = await Note.findByIdAndDelete(id)
      return res.redirect('/notes')
   } catch (err) {
      console.log(
         '\n',
         `🐶  > Ошибка сервера при обращении к БД: ${err.message}`,
      )
   }
}
