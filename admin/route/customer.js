const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { adminblockcustomerController, adminretrievesinglecustomerController, adminretrieveallController, adminsendnewsletterController, adminretrievebothsubcribersanduseremailController } = require("../customer/controller/account");
const {
  adminretrievecustomerorderController,
  adminretrieveallcustomerorderController,
  adminretrievesinglecustomerorderController,
  adminconfirmcustomerorderController,
  adminqueryorderController,
  adminretrievequeryorderController,

} = require("../customer/controller/order");
const {
  adminretrievecustomerorderValidation,
  admincustomerorderValidation,
  adminsendnewletterValidation,
  adminqueryorderValidation,
} = require("../customer/core/validation");

const router = require("express").Router();

//order
router.post(
  "/block/customer",
  adminretrievecustomerorderValidation,
  admin_check_token,
  
  adminblockcustomerController
);
router.post(
  "/retrieve/single/customer",
  adminretrievecustomerorderValidation,
  admin_check_token,

  adminretrievesinglecustomerController
);
router.post(
  "/retrieve/all/customer",
  adminValidation,
  admin_check_token,
  
  adminretrieveallController
);
router.post(
  "/retrieve/customer/order",
  adminretrievecustomerorderValidation,
  admin_check_token,
  
  adminretrievecustomerorderController
);
router.post(
  "/retrieve/all/customer/order",
  adminValidation,
  admin_check_token,

  adminretrieveallcustomerorderController
);
router.post(
  "/retrieve/single/customer/order",
  admincustomerorderValidation,
  admin_check_token,
 
  adminretrievesinglecustomerorderController
);

router.post(
  "/confirm/customer/order",
  admin_check_token,
  admincustomerorderValidation,
  adminconfirmcustomerorderController
);
router.post(
  "/query/order",
  adminqueryorderValidation,
  admin_check_token,
  adminqueryorderController
);
router.post(
  "/retrieve/query/order",
  adminValidation,
  admin_check_token,
  adminretrievequeryorderController
);


//newlestter  

router.post(
  "/send/newsletter",
  adminsendnewletterValidation,
  admin_check_token,
  adminsendnewsletterController
);
router.post(
  "/retrieve/user/emails",
  adminValidation,
  admin_check_token,
  adminretrievebothsubcribersanduseremailController
);

module.exports = router;
