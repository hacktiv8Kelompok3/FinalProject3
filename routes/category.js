const router = require('express').Router()
const category = require('../controllers/categoryController')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

router.use(authentication)
router.post('/',authorization.admin, category.createCategory)
router.patch('/:id', authorization.admin, category.updateCategory)
router.delete('/:id', authorization.admin, category.deleteCategory)

module.exports = router