const { CustomerretrievesingleblogController } = require("../../customer/controller/comment");
const { SellerupdateblogController, SellerupdateblogstatusController, SellerdeleteblogController } = require("../../seller/controller/blog");
const { AdminaddblogController, AdminretrieveallblogController } = require("../controller/blog");
const { admin_check_token } = require("../core/authorization");
const { adminaddblogValidation, adminretrievedeleteValidation, adminupdateblogValidation, adminupdateblogstatusValidation, adminretrieveblogValidation } = require("../core/validation/blog");


const router = require("express").Router();



router.post(
    "/add/blog",
    adminaddblogValidation ,
  admin_check_token,
  AdminaddblogController
);

router.post(
    "/update/blog",
    adminupdateblogValidation,
  admin_check_token,
  SellerupdateblogController
);
router.post(
    "/update/blog/status",
    adminupdateblogstatusValidation,
  admin_check_token,
  SellerupdateblogstatusController
);
router.post(
    "/retrieve/all/blog",
    adminretrieveblogValidation,
    admin_check_token,
  AdminretrieveallblogController
);
router.post(
    "/retrieve/single/blog",
    adminretrievedeleteValidation ,
  admin_check_token,
  CustomerretrievesingleblogController
);
router.post(
    "/delete/blog",
    adminretrievedeleteValidation ,
  admin_check_token,
  SellerdeleteblogController
);

module.exports = router