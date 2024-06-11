const { CustomerretrievesingleaddressController, CustomersetdefaultController, CustomerretrievealladdressController, CustomercreateaddressController, CustomerupdateaddressController, CustomerretrievedefaultaddressController } = require("../controller/address");
const { customer_check_token } = require("../core/authorization");
const { customersetdefaultaddressValidation, customercreateaddressValidation, customerupdateaddressValidation } = require("../core/validation/address");
const { customerValidation } = require("../core/validation/auth");


const router = require("express").Router();

router.post(
  "/create/address",
  customer_check_token,
  customercreateaddressValidation,
  CustomercreateaddressController
);
router.post(
  "/update/address",
  customer_check_token,
  customerupdateaddressValidation,
  CustomerupdateaddressController
);
router.post(
  "/setdefault/address",
  customer_check_token,
  customersetdefaultaddressValidation,
  CustomersetdefaultController
);
router.post(
  "/retrieve/single/address",
  customer_check_token,
  customersetdefaultaddressValidation,
  CustomerretrievesingleaddressController
);
router.post(
  "/retrieve/all/address",
  customer_check_token,
  customerValidation,
  CustomerretrievealladdressController
);
router.post(
  "/retrieve/default/address",
  customer_check_token,
  customerValidation,
  CustomerretrievedefaultaddressController
);

module.exports = router