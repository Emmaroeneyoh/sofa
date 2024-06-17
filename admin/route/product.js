const { createProductController, adminpublishproductController, retrieveallproductController, retrievesingleproductController, updateProductController } = require("../controller/product");
const { admin_check_token } = require("../core/authorization");
const { upload } = require("../core/upload");
const { adminValidation } = require("../core/validation/auth");
const { createProductValidation, retrieveallproductValidation, retrievesingleproductValidation, updateProductValidation } = require("../core/validation/product");



const router = require("express").Router();

router.post(
  "/create/product",
  // upload.single('productfile'),
  createProductValidation,
  admin_check_token,
  createProductController
);
router.post(
  "/update/product",
  // upload.single('productfile'),
  updateProductValidation,
  admin_check_token,
  updateProductController
);
// router.post(
//   "/create/product",
//   upload.single('productfile'),
//     adminValidation,
//   admin_check_token,
//   adminpublishproductController
// );
router.post(
  "/retrieve/all/product",
  retrieveallproductValidation ,
  admin_check_token,
  retrieveallproductController
);
router.post(
  "/retrieve/single/product",
  retrievesingleproductValidation ,
  admin_check_token,
  retrievesingleproductController
);


module.exports = router