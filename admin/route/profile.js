const { customerretrievedeleterequestController, customeretrievealldeleterequestController, sellerretrievedeleterequestController, selleretrievealldeleterequestController, customerapprovedeleterequestController, sellerapprovedeleterequestController } = require("../controller/profile");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { retrieverequestValidation, approvecustomerrequestValidation, approvesellerrequestValidation } = require("../core/validation/profile");


 const router = require("express").Router();
  
 router.post(
     "/customer/retrieve/single/request",
     retrieverequestValidation,
   admin_check_token,
   customerretrievedeleterequestController
);

 router.post(
     "/customer/retrieve/all/request",
     adminValidation,
   admin_check_token,
   customeretrievealldeleterequestController
);
 router.post(
     "/approve/customer/request",
     approvecustomerrequestValidation,
   admin_check_token,
   customerapprovedeleterequestController
);

//for seller
 router.post(
     "/seller/retrieve/single/request",
     retrieverequestValidation,
   admin_check_token,
   sellerretrievedeleterequestController
);

 router.post(
     "/seller/retrieve/all/request",
     adminValidation,
   admin_check_token,
   selleretrievealldeleterequestController
);
 router.post(
     "/approve/seller/request",
     approvesellerrequestValidation,
   admin_check_token,
   sellerapprovedeleterequestController
);

module.exports = router