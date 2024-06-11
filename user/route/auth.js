const {
  CustomerSignupController, 
  CustomerLoginController,
  CustomerresetPassword,
  CustomerNewPasswordLink,
  mobilecustomerNewPasswordLink,
  mobilecustomerresetPassword,
  Customerconfirmemail,
  Customersendconfirmemailcontroller,
  Customerconfirmemailcontroller,
} = require("../controller/auth");
const { customeraddwaitlistController } = require("../controller/wishlist");
const {
  customersignupValidation,
  customerLoginValidation,
  customerforgotpasswordValidation,
  customerResetpasswordValidation,
  mobilecustomerResetpasswordValidation,
  customerconfirmemailValidation,
  customercheckemailValidation,
} = require("../core/validation/auth");
const { customerwaitlistValidation } = require("../core/validation/wishlist");

const router = require("express").Router();

router.post("/signup", customersignupValidation, CustomerSignupController);
router.post("/login", customerLoginValidation, CustomerLoginController);
router.post(
  "/forgot/password",
  customerforgotpasswordValidation,
  CustomerNewPasswordLink
);
router.post(
  "/mobile/forgot/password",
  customerforgotpasswordValidation,
  mobilecustomerNewPasswordLink
);
router.post(
  "/mobile/reset/password",
    mobilecustomerResetpasswordValidation,
  mobilecustomerresetPassword
);
router.post(
  "/reset/password",
  customerResetpasswordValidation,
  CustomerresetPassword
);
router.post(
  "/send/email",
  customerconfirmemailValidation,
  Customersendconfirmemailcontroller
);
router.post(
  "/check/email",
  customercheckemailValidation,
  Customerconfirmemailcontroller
);

//waitlist
router.post(
  "/waitlist",
  customerwaitlistValidation,
  customeraddwaitlistController
);

module.exports = router;
