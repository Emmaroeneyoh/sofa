const { adminremoveroleController, adminaddroleController, adminchangestaffstatusController, adminretrievestaffController, admindeleletestaffController, adminupdateController } = require("../controller/hr");
const { adminupdateroleController, admincreateroleController, admindeleteroleController, adminretrieveroleController } = require("../controller/role");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { admincreateroleValidation, adminupdateroleValidation, admindeleteroleValidation, adminchangestaffstatusValidation, adminremoveroleValidation, adminaddroleValidation, adminupdatestaffValidation, admindeletestaffValidation } = require("../core/validation/hr");




const router = require("express").Router();

router.post(
    "/create/role",
    admincreateroleValidation,
  admin_check_token,
  admincreateroleController
);
router.post(
    "/update/role",
    adminupdateroleValidation,
  admin_check_token,
  adminupdateroleController
);
router.post(
    "/delete/role",
    admindeleteroleValidation,
  admin_check_token,
  admindeleteroleController
);
router.post(
    "/retrieve/role",
    adminValidation,
  admin_check_token,
  adminretrieveroleController
);


router.post(
    "/change/staff/status",
    adminchangestaffstatusValidation,
  admin_check_token,
  adminchangestaffstatusController
);
router.post(
    "/remove/role",
    adminremoveroleValidation,
  admin_check_token,
  adminremoveroleController
);
router.post(
    "/add/role",
    adminaddroleValidation,
  admin_check_token,
  adminaddroleController
);
router.post(
    "/retrieve/staff",
    adminValidation,
  admin_check_token,
  adminretrievestaffController
);
router.post(
    "/update/staff",
    adminupdatestaffValidation,
  admin_check_token,
  adminupdateController 
);
router.post(
    "/delete/staff",
    admindeletestaffValidation,
  admin_check_token,
  admindeleletestaffController
);
module.exports = router