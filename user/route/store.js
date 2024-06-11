const { CustomervisitstoreController, CustomerretrievestoreController, CustomersellercategoryController, CustomersellersubcategoryController, CustomerstoreproductController } = require("../controller/store");
const { customer_check_token } = require("../core/authorization");
const { customerretrievestoreValidation, customerretrievestoreproductValidation, customerretrievestoresubcategoryValidation } = require("../core/validation/store");

CustomervisitstoreController


const router = require("express").Router();

router.post(
  "/visit/store",
//   customerupdateprofileValidation,
CustomervisitstoreController
);


router.post(
    "/retrieve/single/store",
    customerretrievestoreValidation , 
CustomerretrievestoreController
);
router.post(
    "/retrieve/seller/category",
    customerretrievestoreValidation , 
    // customer_check_token,
    CustomersellercategoryController
);
router.post(
    "/retrieve/seller/subcategory",
    customerretrievestoresubcategoryValidation , 
    // customer_check_token,
    CustomersellersubcategoryController
);
router.post(
    "/retrieve/store/product",
    customerretrievestoreproductValidation , 
    // customer_check_token,
    CustomerstoreproductController
);

module.exports = router