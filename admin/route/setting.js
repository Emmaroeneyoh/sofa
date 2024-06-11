const { adminaddfileController, admindeleteimagebankController, adminretrieveimagebankController } = require("../controller/filebank");
const { createpaymentplatformController, createupdateplatformController, createsmtpcontroller, createupdatesmtpController, updateplatformstatusController, retrieveplatformController, createinvoicecontroller, retrievesmtpController, updateinvoiceController, retrieveinvoiceController } = require("../controller/setting");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { updateplatformValidation, updatesmtpValidation, updateplatformstatusValidation, adminaddfileValidation, admindeletefileValidation, adminupdateinvoiceValidation } = require("../core/validation/setting");




 const router = require("express").Router();
  
 router.post(
     "/create/platform",
     adminValidation,
   admin_check_token,
   createpaymentplatformController
);

 router.post(
     "/update/platform",
     updateplatformValidation,
   admin_check_token,
   createupdateplatformController
);
 router.post(
     "/update/platform/status",
     updateplatformstatusValidation,
   admin_check_token,
   updateplatformstatusController
);
 router.post(
     "/retrieve/platform",
     adminValidation,
   admin_check_token,
   retrieveplatformController
);

router.post(
    "/create/smtp",
    adminValidation,
  admin_check_token,
  createsmtpcontroller
);
router.post(
    "/update/smtp",
    updatesmtpValidation,
  admin_check_token,
  createupdatesmtpController
);
router.post(
    "/retrieve/smtp",
    adminValidation,
  admin_check_token,
  retrievesmtpController
);


//invoice 
router.post(
  "/create/invoice",
  adminValidation,
admin_check_token,
createinvoicecontroller
);
router.post(
  "/update/invoice",
  adminupdateinvoiceValidation,
admin_check_token,
updateinvoiceController
);
router.post(
  "/retrieve/invoice",
  adminValidation,
admin_check_token,
retrieveinvoiceController
);


//file setting
router.post(
  "/add/file",
  adminaddfileValidation,
admin_check_token,
adminaddfileController
);
router.post(
  "/delete/file",
  admindeletefileValidation,
admin_check_token,
admindeleteimagebankController
);
router.post(
  "/retrieve/file",
  adminValidation,
admin_check_token,
adminretrieveimagebankController
);
module.exports = router

 