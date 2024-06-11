const {
  createcategoryController,
  updatecategoryController,
  retrievesinglecategoryController,
  retrieveallcategoryController,
} = require("../controller/category");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const {
  createcategoryValidation,
  updatecategoryValidation,
  retrievedeletecategoryValidation,
} = require("../core/validation/category");

const router = require("express").Router();

router.post(
  "/create/category",
  createcategoryValidation,
  admin_check_token,
 
  createcategoryController
);
router.post(
  "/update/category",
  updatecategoryValidation,
  admin_check_token,
  updatecategoryController
);
router.post(
  "/retrieve/single/category",
  retrievedeletecategoryValidation,
  admin_check_token,
  
retrievesinglecategoryController
);
router.post(
    "/retrieve/all/category",
    adminValidation,
  admin_check_token,
  retrieveallcategoryController,
);

module.exports = router;
