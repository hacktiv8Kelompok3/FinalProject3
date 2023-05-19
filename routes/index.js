const router = require("express").Router();
const userRoute = require("./user.js")

router.use('/users', userRoute);

module.exports = router;

