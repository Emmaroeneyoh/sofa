const { userretriveallproductController, userretrivesingleproductController } = require("../app/controller/product");
const { user_check_token } = require("../core/authorization");
const { userValidation } = require("../core/validation/auth");
const { usersingleproductValidation } = require("../core/validation/product");


const router = require("express").Router();

router.post(
  "/retrieve/all/product",
  // userValidation,
  // user_check_token,
  userretriveallproductController
);
router.post(
  "/retrieve/single/product",
  usersingleproductValidation,
  // user_check_token,
  userretrivesingleproductController
);

module.exports = router