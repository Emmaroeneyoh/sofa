const { CustomerriderchatController, CustomerretrieveridersController, CustomersupportController } = require("../controller/chat");
const { customeraddorderController, customerretrieveallordercontroller, customerretrievesingleordercontroller, customerconfirmordercontroller, customerchangeorderstatusdashxcontroller, customerretrieveactiveordercontroller, customerretrievecompletedordercontroller, customerretrievecancelorderordercontroller } = require("../controller/order");
const { CustomerallordercodeController, CustomersingleordercodeController } = require("../controller/order_code");
const { CustomersharecartController, CustomerretrievesharecartController, customersendcartController } = require("../controller/sharecart");
const { customer_check_token } = require("../core/authorization");
const { customerValidation } = require("../core/validation/auth");
const { customercreateordervalidation, customerordervalidation, sharecartvalidation, retrievesharecartvalidation, sendcartcodevalidation, changeorderstatusdashxvalidation } = require("../core/validation/order");


const router = require("express").Router();

router.post(
  "/create/order",
  customer_check_token,
  customercreateordervalidation,
  customeraddorderController
);
router.post(
  "/dashx/order/status",
  changeorderstatusdashxvalidation,
  customerchangeorderstatusdashxcontroller
);
router.post(
  "/retrive/all/customer/order",
  customerValidation,
  customer_check_token,
  customerretrieveallordercontroller
);
router.post(
  "/retrive/active/customer/order",
  customerValidation,
  customer_check_token,
  customerretrieveactiveordercontroller
);
router.post(
  "/retrive/complete/customer/order",
  customerValidation,
  customer_check_token,
  customerretrievecompletedordercontroller
);
router.post(
  "/retrive/cancel/customer/order",
  customerValidation,
  customer_check_token,
  customerretrievecancelorderordercontroller
);
router.post(
  "/retrive/single/customer/order",
  customerordervalidation,
  customer_check_token,
  customerretrievesingleordercontroller
);
router.post(
  "/customer/confirm/order",
  customerordervalidation,
  customer_check_token,
  customerconfirmordercontroller
);

//order code
router.post(
  "/all/ordercode",
  customerValidation,
  customer_check_token,
  CustomerallordercodeController
);
router.post(
  "/single/ordercode",
  customerordervalidation,
  customer_check_token,
  CustomersingleordercodeController
);
//sharecart
router.post(
  "/sharecart",
  sharecartvalidation,
  CustomersharecartController
);

router.post(
  "/retrieve/sharecart",
  retrievesharecartvalidation,
  CustomerretrievesharecartController
)
router.post(
  "/send/cartcode",
  sendcartcodevalidation,
  customersendcartController
)

router.post(
  "/retrieve/rider",
  customerValidation,
  customer_check_token,
  CustomerretrieveridersController
)
router.post(
  "/support/chat",
  customerValidation,
  customer_check_token,
  CustomersupportController
)
module.exports = router