const { adminValidation } = require("../../admin/core/validation/auth");
const { userretriveallproductController, userretrivesingleproductController, userretrivecategoryController, userdashboardController, userretriveallcategoryproductController } = require("../app/controller/product");
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
  "/retrieve/subcategory/product",
  userretriveallcategoryproductController
);
router.post(
  "/retrieve/single/product",
  usersingleproductValidation,
  // user_check_token,
  userretrivesingleproductController
);
router.post(
  "/retrieve/category",
  userretrivecategoryController
);
router.post(
  "/dashboard",
  userValidation,
  user_check_token,
  userdashboardController
);

module.exports = router