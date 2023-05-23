const router = require("express").Router();
const userRoute = require("./user.js")
const categoryRoute = require('./category.js')
const productRoute = require('./product.js')
const transactionRoute = require('./transaction.js')

router.use('/categories', categoryRoute)
router.use('/users', userRoute);
router.use('/products', productRoute)
router.use('/transactions', transactionRoute)

module.exports = router;

