const { updatebrandController, retrievesinglebrandController, retrieveallbrandController, createbrandController } = require("../controller/brand");
const { admindashboardController } = require("../controller/dashboad");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { createbrandValidation, updatebrandValidation, retrievedeletebrandValidation } = require("../core/validation/brand");

  
  const router = require("express").Router();
  
  router.post(
    "/create/brand",
    admin_check_token,
    createbrandValidation,
    createbrandController
  );
  router.post(
    "/update/brand",
    admin_check_token,
    updatebrandValidation,
    updatebrandController
  );
  router.post(
    "/retrieve/single/brand",
    admin_check_token,
    retrievedeletebrandValidation,
  retrievesinglebrandController
  );
  router.post(
      "/retrieve/all/brand",
      adminValidation,
    admin_check_token,
    retrieveallbrandController,
  );
  

  //index
  router.post(
    "/dashboard",
    adminValidation,
  admin_check_token,
  admindashboardController,
);
  module.exports = router;
  