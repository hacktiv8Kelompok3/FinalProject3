const router = require("express").Router();
const transactionhistory = require("../controllers/transactionController");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

router.use(authentication);
router.post("/", transactionhistory.buyProduct);
router.get("/user", transactionhistory.getTransactionUser);
router.get(
  "/:transactionId",
  authorization.admin,
  transactionhistory.getTransactionsById
);
router.get(
  "/admin",
  authorization.admin,
  transactionhistory.getTransactionAdmin
);

module.exports = router;
