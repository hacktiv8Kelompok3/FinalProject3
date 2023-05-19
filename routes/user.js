const router = require('express').Router()
const user = require('../controllers/UserControllers')

router.post('/register', user.register)

module.exports = router
