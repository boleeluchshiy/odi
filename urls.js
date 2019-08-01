const express = require('express')
const router = express.Router()

const views = require('./views')

router.get('/', views.index)
// router.use('/notes', require('./notes/urls'))
// router.use('/some-app', require('./some-app/urls'))
router.use('/admin', require('./admin/app'))
router.use('/users', require('./users/urls'))
router.use('/:username', require('./user/urls'))
// router.use('/:username', (req, res) => res.send(req.params))
module.exports = router
