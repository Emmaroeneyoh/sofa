const {
  AdminSignupController,
  AdminLoginController,
  AdminNewPasswordLink,
  AdminresetPassword,
  adminretrieveprofileController,
} = require("../controller/auth");
const { admin_check_token } = require("../core/authorization");
const {
  adminsignupValidation,
  adminLoginValidation,
  adminforgotpasswordValidation,
  adminResetpasswordValidation,
  adminValidation,
} = require("../core/validation/auth");

const router = require("express").Router();

router.post("/signup", adminsignupValidation, AdminSignupController);
router.post("/login", adminLoginValidation, AdminLoginController);
router.post(
  "/forgot/password",
  adminforgotpasswordValidation,
  AdminNewPasswordLink
);
router.post(
  "/reset/password",
  adminResetpasswordValidation,
  AdminresetPassword
);
router.post(
  "/retrieve/profile",
    adminValidation,
    admin_check_token,
  adminretrieveprofileController
);

module.exports = router;
