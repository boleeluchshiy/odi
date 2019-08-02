const mongoose = require('mongoose')
const config = require('./default')
const db = config.mongoURI

module.exports = async function connectDB() {
   try {
      await mongoose.connect(db, {
         useNewUrlParser: true,
         useCreateIndex: true,
      })
      return console.log('\n', `🙋  > Mongo подкючена.`)
   } catch (err) {
      console.log(`\n🐶  > Ошибка подключения Mongo: ${err.message}`)
      return process.exit(1)
   }
}
