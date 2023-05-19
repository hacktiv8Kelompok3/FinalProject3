const router = require('express').Router()
const user = require('../controllers/UserControllers')
const authentication = require("../middleware/authentication")
const authorization = require('../middleware/authorization')

router.post('/register', user.register)
router.post('/login', user.login)
router.use(authentication)
router.put('/:id',authorization.user, user.updateUser)

module.exports = router
