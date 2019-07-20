const config = require('config')
const db = config.get('mongoURI')
const mongoose = require('mongoose')

module.exports = function connectDB() {
   try {
      mongoose.connect(db, {})
      console.log('\n', `🙋  > MongoDB подключена.`)
   } catch (err) {
      console.log(
         '\n',
         `🐶  > Не смог подключиться к MongoDB: ${err.message}`,
      )
      process.exit(1)
   }
}
