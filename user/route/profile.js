const { Customerretrievetemaplate } = require("../../helper/email");
const {
  CustomerupdateprofileController,
  CustomerupdatepasswordController,
  CustomerretrieveprofileController,
  CustomerupdatephotoController,
  customerdeleterrequestController,
  customerdashboardController,
} = require("../controller/profile");
const { customer_check_token } = require("../core/authorization");
const { customerValidation } = require("../core/validation/auth");
const {
  customerupdateprofileValidation,
  customerupdatepasswordValidation,
  customerretrieveprofileValidation,
  customerupdatephotoValidation,
  customerdeleteaccoutnValidation,
} = require("../core/validation/profile");

const router = require("express").Router();

router.post(
  "/update/profile",
  customer_check_token,
  customerupdateprofileValidation,
  CustomerupdateprofileController
);
router.post(
  "/update/password",
  customer_check_token,
  customerupdatepasswordValidation,
  CustomerupdatepasswordController
);
router.post(
  "/retrieve/profile",
  customer_check_token,
  customerretrieveprofileValidation,
  CustomerretrieveprofileController
);
router.post(
  "/update/photo",
  customer_check_token,
  customerupdatephotoValidation,
  CustomerupdatephotoController
);
router.post(
  "/dashboard",
  customerValidation,
  customer_check_token,
 
  customerdashboardController
);
router.post(
  "/delete/account",
  customerdeleteaccoutnValidation,
  customerdeleterrequestController
);

router.get(
  "/template",
  Customerretrievetemaplate
);

module.exports = router;
