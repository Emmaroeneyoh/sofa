const {
  createcategoryController,
  updatecategoryController,
  retrievesinglecategoryController,
  retrieveallcategoryController,
  deletecategoryController,
} = require("../controller/category");
const {
  retrieveallsubcategoryController,
  createsubcategoryController,
  deletesubcategoryController,
  retrievesubcategoriesController,
} = require("../controller/subcategory");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const {
  createcategoryValidation,
  updatecategoryValidation,
  retrievedeletecategoryValidation,
  retrievecategorysubcategoryValidation,
  createsubcategoryValidation,
  retrievedeletesubcategoryValidation,
  updatesubcategoryValidation,
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
  "/delete/category",
  retrievedeletecategoryValidation,
  admin_check_token,
  deletecategoryController
);
router.post(
  "/update/category",
  updatecategoryValidation,
  admin_check_token,
  updatecategoryController
);
router.post(
  "/retrieve/all/category",
  adminValidation,
  admin_check_token,
  retrieveallcategoryController
);

//subcate
router.post(
  "/create/subcategory",
  createsubcategoryValidation,
  admin_check_token,
  createsubcategoryController
);
router.post(
  "/update/subcategory",
  updatesubcategoryValidation,
  admin_check_token,
  createsubcategoryController
);
router.post(
  "/retrieve/category/subcategory",
  retrievecategorysubcategoryValidation,
  admin_check_token,
  retrieveallsubcategoryController
);
router.post(
  "/retrieve/all/subcategory",
  adminValidation,
  admin_check_token,
  retrievesubcategoriesController
);
router.post(
  "/delete/subcategory",
  retrievedeletesubcategoryValidation,
  admin_check_token,
  deletesubcategoryController
);

module.exports = router;
