const { contactusCONTROLLER, contactus2CONTROLLER } = require("../app/controller");
const { userSignupController, userLoginController, userNewPasswordLink, userresetPassword } = require("../app/controller/auth");
const { contactusValidation, contactus2Validation } = require("../core/validation");
const { usersignupValidation, userLoginValidation, userforgotpasswordValidation, userResetpasswordValidation } = require("../core/validation/auth");


const router = require("express").Router();

router.post("/signup", usersignupValidation, userSignupController);
router.post("/login",  userLoginValidation, userLoginController);
router.post("/forgot/password", userforgotpasswordValidation, userNewPasswordLink);
router.post("/reset/password", userResetpasswordValidation, userresetPassword);


// //contact us
// router.post("/contactus", contactusValidation, contactusCONTROLLER);
// router.post("/contactus2", contactus2Validation, contactus2CONTROLLER);






module.exports = router