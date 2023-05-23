const router = require("express").Router();
const userRoute = require("./user.js")
const categoryRoute = require('./category.js')
const productRoute = require('./product.js')

router.use('/categories', categoryRoute)
router.use('/users', userRoute);
router.use('/product', productRoute)

module.exports = router;

