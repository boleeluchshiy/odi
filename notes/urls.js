const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const views = require('./views')

router.get('/', views.index)

router.get('/create', views.getCreate)

router.post(
   '/create',
   [
      check('title', 'Название обязательно.')
         .not()
         .isEmpty(),
      check('desc', 'Описание обязательно.')
         .not()
         .isEmpty(),
   ],
   views.postCreate,
)

router.get('/:id/delete', views.delete)

module.exports = router
