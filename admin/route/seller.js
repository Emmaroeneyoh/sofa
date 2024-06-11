const {
  approveproductController,
  retrievesingleproductController,
  retrieveapproveproductController,
  retrieveunapproveproductController,
  retrieveallproductController,
  retrieveallproductreveiewController,
  adminblockproductController,
} = require("../controller/product");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const {
  approveproductValidation,
  retrievesingleproductValidation,
  retrievesellerproductValidation,
} = require("../core/validation/product");
const {
  AdminretrievesinglesellerController,
  adminapprovesellerController,
  adminretrieveallsellerController,
  adminblocksellerController,
} = require("../seller/controller/account");
const { approvebrandController } = require("../seller/controller/brand");
const {
  adminretrievesellerorderController,
  adminretrieveallsellerorderController,
  adminretrievesinglesellerorderController,
  adminconfirmsellerorderController,
  adminretrievesellerproductController,
} = require("../seller/controller/order");
const {
  approvebrandValidation,
  adminretrievesellerorderValidation,
  adminsellerorderValidation,
} = require("../seller/core/validation");

const router = require("express").Router();

//for brand
router.post(
  "/approve/brand",
  admin_check_token,
  approvebrandValidation,
  approvebrandController
);

//for product
router.post(
  "/approve/product",
  admin_check_token,
  approveproductValidation,
  approveproductController
);

router.post(
  "/block/product",
  approveproductValidation,
  admin_check_token,
  adminblockproductController
);
router.post(
  "/retrieve/single/product",
  retrievesingleproductValidation,
  admin_check_token,

  retrievesingleproductController
);
router.post(
  "/retrieve/approved/product",
  adminValidation,
  admin_check_token,
 
  retrieveapproveproductController
);
router.post(
  "/retrieve/unapproved/product",
  admin_check_token,
  adminValidation,
  retrieveunapproveproductController
);
router.post(
  "/retrieve/all/product",
  admin_check_token,
  adminValidation,
  retrieveallproductController
);

//order
router.post(
  "/retrieve/seller/order",
  adminretrievesellerorderValidation,
  admin_check_token,
  
  adminretrievesellerorderController
);
router.post(
  "/retrieve/all/seller/order",
  adminValidation,
  admin_check_token,
  
  adminretrieveallsellerorderController
);
router.post(
  "/retrieve/single/seller/order",
  adminsellerorderValidation,
  admin_check_token,
  
  adminretrievesinglesellerorderController
);
router.post(
  "/block/seller",
  adminretrievesellerorderValidation,
  admin_check_token,
  adminblocksellerController
);
// router.post(
//   "/retrieve/single/seller/order",
//   admin_check_token,
//   adminsellerorderValidation,
//   adminretrievesinglesellerorderController
// );
router.post(
  "/confirm/seller/order",
  admin_check_token,
  adminsellerorderValidation,
  adminconfirmsellerorderController
);
router.post(
  "/product/review",
  adminValidation,
  admin_check_token,
  retrieveallproductreveiewController
);

//account
router.post(
  "/retrieve/single/seller",
  adminretrievesellerorderValidation,
  admin_check_token,
  AdminretrievesinglesellerController
);
router.post(
  "/retrieve/all/seller",
  adminValidation,
  admin_check_token,
  adminretrieveallsellerController
);
router.post(
  "/approve/seller",
  adminretrievesellerorderValidation,
  admin_check_token,
  adminapprovesellerController
);
router.post(
  "/retrieve/seller/product",
  retrievesellerproductValidation,
  admin_check_token,
  adminretrievesellerproductController
);

module.exports = router;
