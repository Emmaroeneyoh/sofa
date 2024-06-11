const {
  CustomercreateticketController,
} = require("../../customer/controller/support");
const {
  sellercreateticketController,
} = require("../../seller/controller/support");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const {
  adminretrievechatController,
  adminretrieveticketController,
  adminchangestatusController,
} = require("../customer/controller/chat");
const {
  adminretrieveticketValidation,
  adminretrievechatValidation,
  admincreateticketValidation,
  adminchangecustomerticketstatusValidation,
  admincustomerticketValidation,
} = require("../customer/core/validation");
const {
  adminretrievesellerchatController,
  adminretrievesellerticketController,
  adminchangesellerticketstatusController,
} = require("../seller/controller/chat");
const {
  adminretrievesellerchatValidation,
  adminretrievesellerticketValidation,
  admincreatesellerticketValidation,
  adminchangesellerticketstatusValidation,
  adminretrievesellerticketstatusValidation,
} = require("../seller/core/validation");

const router = require("express").Router();

//support chat for customer
router.post(
  "/create/customer/ticket",
  admincreateticketValidation,
  admin_check_token,
  CustomercreateticketController
);
router.post(
  "/change/customer/ticketstatus",
  adminchangecustomerticketstatusValidation,
  admin_check_token,
  adminchangestatusController
);
router.post(
  "/retrieve/customer/ticket",
  admincustomerticketValidation,
  admin_check_token,
  adminretrieveticketController
);
router.post(
  "/retrieve/customer/chat",
  adminretrievechatValidation,
  admin_check_token,
  adminretrievechatController
);

//seller customer
router.post(
  "/create/seller/ticket",
  admincreatesellerticketValidation,
  admin_check_token,
  sellercreateticketController
);
router.post(
  "/retrieve/seller/ticket",
  adminretrievesellerticketstatusValidation,
  admin_check_token,
  adminretrievesellerticketController
);
router.post(
  "/change/seller/ticketstatus",
  adminchangesellerticketstatusValidation,
  admin_check_token,
  adminchangesellerticketstatusController
);
router.post(
  "/retrieve/seller/chat",
  adminretrievesellerchatValidation,
  admin_check_token,
  adminretrievesellerchatController
);
module.exports = router;
