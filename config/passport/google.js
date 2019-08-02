const { User } = require('../../user/models')

const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../keys')
const bcryptjs = require('bcryptjs')

module.exports = function(passport) {
   passport.use(
      new GoogleStrategy(
         {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/user/auth/google/callback',
            //proxy: true,
         },
         async (accessToken, refreshToken, profile, done) => {
            try {
               console.log(`\n🙋  > google local`)
               let user = await User.findOne({ googleId: profile.id })

               // сразу возвращаем, если пользователь существует
               if (user) return done(null, user)

               // Создаем нового пользователя (нужно завернуть в функцию check & create)
               const { email } = profile._json
               const { givenName, familyName } = profile.name
               const googleId = profile.id

               //1. check email
               console.log(`\n🙋  > Проверяю, есть ли почта ${email}.`)
               user = await User.findOne({ email })

               if (user) {
                  //если почта есть, значит этот пользователь ее уже регистрировал
                  //и в имеющийся user нужно добавить google id
                  console.log(`\n🙋  > Добавляю в имеющийся user googleId.`)
                  user.googleId = googleId
                  user.save()

                  return done(null, user)
               }

               //2. check username (пробуем username от гугло-почты)
               let username = email.substr(0, email.indexOf('@'))

               console.log(`\n🙋  > Проверяю, свободно ли ${username}.`)
               user = await User.findOne({ username })

               while (user) {
                  //сгенерировать случайный хвост для имени пользователя
                  let randomTail = Math.floor(Math.random() * 100)
                  username += `-${randomTail}`
                  console.log(`\n🙋  > Username с хвостом: `, username)
                  user = await User.findOne({ username })
               }

               //3. создаем нового пользователя
               //генерируем пароль
               // prettier-ignore
               console.log(`\n🙋  > Создаю нового пользователя.`)
               const password = Math.random()
                  .toString(36)
                  .slice(-8)
               user = await User({
                  username,
                  email,
                  password,
                  familyName,
                  givenName,
                  googleId,
               })

               //шифруем пароль
               const salt = await bcryptjs.genSalt(10)
               user.password = await bcryptjs.hash(password, salt)

               await user.save()
               console.log(`\n🙋  > Создали своего пользователя: `, user)

               return done(null, user)
            } catch (err) {
               console.log(`\n🐶  > Ошибка сервера: ${err.message}`)
               return res.send('Ошибка сервера')
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
