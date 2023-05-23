const router = require('express').Router()
const product = require('../controllers/productcategory')
const authentication = require("../middleware/authentication")
const authorization = require('../middleware/authorization')


router.use(authentication)
router.post('/', authorization.admin,product.createProduct)
router.get('/', product.getAllProduct)
router.put('/:id', authorization.product,product.editProduct)
router.patch('/:id', authorization.product,product.editCategory)
router.delete('/:id', authorization.product,product.deleteCategory)

module.exports = router
    