const express = require('express')
const router = express.Router()

const views = require('./views')

const { check } = require('express-validator')

router.get('/', views.index)
router.use(
   '/create',
   [
      check('username', 'Имя пользователя обязательно.')
         .not()
         .isEmpty(),
      check('email', 'Некорректный email').isEmail(),
      check(
         'password',
         'Пароль должен быть не меньше 3 символов.',
      ).isLength({ min: 3 }),
   ],
   views.create,
)

module.exports = router
