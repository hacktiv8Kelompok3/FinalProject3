const router = require('express').Router()
const product = require('../controllers/productcategory')
const authentication = require("../middleware/authentication")

router.post('/product', product.createProduct)
router.get('/product', product.getAllProduct)

module.exports = router
