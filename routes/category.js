const router = require('express').Router()
const category = require('../controllers/categoryController')
const authentication = require('../middleware/authentication')

router.use(authentication)
router.post('/category', category.createCategory)

module.exports = router