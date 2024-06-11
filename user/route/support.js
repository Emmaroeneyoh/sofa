const { CustomerretrievechatController, CustomercreateticketController, CustomerretrieveticketController } = require("../controller/support");
const { customer_check_token } = require("../core/authorization");
const { customerValidation } = require("../core/validation/auth");
const { customercreateticketValidation, customerretrieveticketValidation } = require("../core/validation/support");

const router = require("express").Router();

router.post(
  "/create/ticket",
    customercreateticketValidation,
    customer_check_token,
    CustomercreateticketController
);

router.post(
  "/retrieve/ticket",
    customerValidation,
    customer_check_token,
    CustomerretrieveticketController
);

router.post(
  "/retrieve/chat",
  customerretrieveticketValidation,
    customer_check_token,
  CustomerretrievechatController
);

module.exports = router