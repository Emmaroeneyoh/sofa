const { stripewebhookController } = require("../../helper/finance/stripe");
const { CustomercreatecartController, CustomerretrievecartController, CustomerdeletecartController, CustomersubtractcartitemController, CustomeraddcartitemController } = require("../controller/cart");
const {
  CustomerfundwalletController,
  CustomerfundwallethistoryController,
  usermakepaymentController,
  CustomerretrievepaymentplatformController,
  Customertestaccount,
  CustomerretrievebankController,
} = require("../controller/wallet");
const { customer_check_token } = require("../core/authorization");
const { customerValidation } = require("../core/validation/auth");
const { customercreatecartValidation, customerdeletecartValidation } = require("../core/validation/cart");
const {
  customerfundwalletvalidation,
  customerfundwallethistoryvalidation,
  customermakepaymenthistoryvalidation,
} = require("../core/validation/wallet");

const router = require("express").Router();

router.post(
  "/fund/wallet",
  CustomerfundwalletController
);
router.post(
  "/test/wallet",
  Customertestaccount
);
router.post(
  "/make/payment",
  customermakepaymenthistoryvalidation,
  customer_check_token,
  usermakepaymentController
);
router.post(
  "/retrieve/bank",
  customerValidation,
  customer_check_token,
  CustomerretrievebankController
);

router.post(
  "/retrieve/wallet/history",
  customerfundwallethistoryvalidation,
  customer_check_token,
  CustomerfundwallethistoryController
);


//stripe integration
router.post(
  "/stripe/payment",
  stripewebhookController
);

//stripe integration
router.post(
  "/retrieve/payment/platform",
  CustomerretrievepaymentplatformController
);

//cart

router.post(
  "/add/cartitem",
  customercreatecartValidation,
  customer_check_token,
  CustomercreatecartController
);

router.post(
  "/retrieve/cartitem",
  customerValidation,
  customer_check_token,
  CustomerretrievecartController
);
router.post(
  "/delete/cartitem",
  customerdeletecartValidation,
  customer_check_token,
  CustomerdeletecartController
);
router.post(
  "/increase/cart/quantity",
  customerdeletecartValidation,
  customer_check_token,
  CustomeraddcartitemController
);
router.post(
  "/decrease/cart/quantity",
  customerdeletecartValidation,
  customer_check_token,
  CustomersubtractcartitemController
);
module.exports = router