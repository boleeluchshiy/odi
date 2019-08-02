const { User } = require('../../user/models')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcryptjs = require('bcryptjs')

module.exports = function(passport) {
   // prettier-ignore
   passport.use(new LocalStrategy({ usernameField: 'email' },
         async (email, password, done) => {
            try {
               let user = await User.findOne({ email })

               //существует ли пользователь
               if (!user) return done(null, false, {
                     message: 'Пользователя не существует.',
                  })

               //совпадает ли пароль
               const isPasswordMatch = await bcryptjs.compare(
                  password,
                  user.password,
               )

               if (!isPasswordMatch) return done(null, false, {
                     message: 'Неверный пароль.',
                  })

               return done(null, user)
            } catch (err) {
               console.log(`\n🐶  > Ошибка сервера: ${err.message}`)
               return done(err)
            }
         },
      ),
   )

   passport.serializeUser((user, done) => {
      done(null, user.id)
   })

   passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
         done(err, user)
      })
   })
}
