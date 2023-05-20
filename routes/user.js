const router = require('express').Router()
const user = require('../controllers/UserControllers')
const authentication = require("../middleware/authentication")
const authorization = require('../middleware/authorization')

router.post('/register', user.register)
router.post('/login', user.login)
router.use(authentication)
router.patch('/topup', user.topUp);
router.put('/:id',authorization.user, user.updateUser)
router.delete('/:id', authorization.user, user.deleteUser)

module.exports = router
