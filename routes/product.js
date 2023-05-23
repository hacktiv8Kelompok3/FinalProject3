const router = require('express').Router()
const product = require('../controllers/productcategory')
const authentication = require("../middleware/authentication")
const authorization = require('../middleware/authorization')


router.use(authentication)
router.post('/', authorization.admin,product.createProduct)
router.get('/product', product.getAllProduct)

module.exports = router
