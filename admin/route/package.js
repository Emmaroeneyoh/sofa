const { createpackageController, updatepackageController, retrievepackageController, deletepackageController } = require("../controller/package");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { createpackageValidation, updatepackageValidation, deletepackageValidation } = require("../core/validation/package");

  
  const router = require("express").Router();
  
  router.post(
    "/create/package",
    createpackageValidation,
    admin_check_token,

    createpackageController
);
  
  router.post(
    "/update/package",
    updatepackageValidation,
    admin_check_token,
    
   updatepackageController
  );
  router.post(
    "/retrieve/package",
    adminValidation,
    admin_check_token,
   
   retrievepackageController
  );
  router.post(
    "/delete/package",
    deletepackageValidation,
    admin_check_token,
  
   deletepackageController
  );


  
  module.exports = router;
  