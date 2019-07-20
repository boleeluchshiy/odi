const express = require('express')
const router = express.Router()

const views = require('./views')

// const pattern = (pattern, method) => router.use(pattern, method)

// const urlpatterns = [
//    pattern('/', views.index),
//    pattern('/some-app', require('./some-app/urls')),
//    pattern('/admin', require('./admin/app')),
// ]

router.get('/', views.index)
router.use('/some-app', require('./some-app/urls'))
router.use('/admin', require('./admin/app'))
module.exports = router
