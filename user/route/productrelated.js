const {
  customerfollowstoreController,
  customerunfollowstoreController,
  customerretrievefollowedstoreController,
} = require("../controller/featurestore");
const { CustomerretrievereorderhistoryController, CustomercreatereorderhistoryController, CustomerretrieveviewhistoryController, CustomercreateviewhistoryController } = require("../controller/history");
const {
  CustomercreateproductqueryController,
  CustomerretrieveallproductqueryController,
} = require("../controller/product.query");
const {
  CustomerreviewproductController,
  userproductnamesearchController,
} = require("../controller/productrleated");
const {
  customeraddwishlistController,
  customerremovewishlistController,
  customerretrieveishlistController,
} = require("../controller/wishlist");
const { customer_check_token } = require("../core/authorization");
const { customerValidation } = require("../core/validation/auth");
const {
  customercreateproductqueryValidation,
} = require("../core/validation/product.query");
const {
  customercreateproductreviewValidation,
  customeraddwishlistValidation,
  customerfollowstoreValidation,
  customerhistoryproductValidation,
} = require("../core/validation/productrelated.validation");
const { customerremovewishlistValidation, customeradditemwishlistValidation, customerremoveitemwishlistValidation } = require("../core/validation/wishlist");

const router = require("express").Router();

router.post(
  "/product/review",
  customer_check_token,
  customercreateproductreviewValidation,
  CustomerreviewproductController
);

//wishlist
router.post(
  "/add/wishlist",
  customeradditemwishlistValidation,
  customer_check_token,
  customeraddwishlistController
);
router.post(
  "/remove/wishlist",
  customerremoveitemwishlistValidation,
  customer_check_token,
  
  customerremovewishlistController
);
router.post(
  "/retrieve/wishlist",
  customer_check_token,
  customerValidation,
  customerretrieveishlistController
);

//followstore
router.post(
  "/follow/store",
  customer_check_token,
  customerfollowstoreValidation,
  customerfollowstoreController
);
router.post(
  "/unfollow/store",
  customer_check_token,
  customerfollowstoreValidation,
  customerunfollowstoreController
);

router.post(
  "/retrieve/followedstore",
  customer_check_token,
  customerValidation,
  customerretrievefollowedstoreController
);

router.post(
  "/query/product",
  customer_check_token,
  customercreateproductqueryValidation,
  CustomercreateproductqueryController
);
router.post(
  "/retrieve/query/product",
  customer_check_token,
  customerValidation,
  CustomerretrieveallproductqueryController
);


//product history validation
router.post(
  "/retrieve/product/order/history",
customerValidation, 
  customer_check_token,
  CustomerretrievereorderhistoryController
);
router.post(
  "/create/product/order/history",
customerhistoryproductValidation, 
  customer_check_token,
  CustomercreatereorderhistoryController
);
router.post(
  "/retrieve/product/view/history",
customerValidation, 
  customer_check_token,
  CustomerretrieveviewhistoryController
);
router.post(
  "/create/product/view/history",
customerhistoryproductValidation, 
  customer_check_token,
  CustomercreateviewhistoryController
);
module.exports = router;
