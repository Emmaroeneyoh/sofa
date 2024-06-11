const { adminretrieveadvertController, adminadvertoController, admindeleteadvertController, adminupdateadvertController } = require("../controller/landingpage/advert");
const { adminaddfeatureshoController, admindeletefeaturedController, adminretrievefeaturedshopController, adminretrieveallfeaturedshopController } = require("../controller/landingpage/featuredshop");
const { adminaddflashsakeController, admindeleteflashsaleController, adminretrieveallflashsaleController, adminretrieveflashsaleController, adminretrieveallproductforflashsaleController } = require("../controller/landingpage/flashsale");
const { adminretrievequalifiedsellerController, adminretrievequalifiedproductController } = require("../controller/landingpage/seller.product");
const { adminaddtodaysakeController, admindeletetodaysaleController, adminretrievetodaysaleController, adminretrievealltodaysaleController } = require("../controller/landingpage/todaysale");
const { createtopcategoryController, deletetopcategoryController, retrievetopcategoryController } = require("../controller/landingpage/topcategory");
const { admin_check_token } = require("../core/authorization");
const { adminValidation } = require("../core/validation/auth");
const { createtopcategoryValidation, adminaddfeatureshopValidation, admindeletefeatureshopValidation, adminretrievesinglefeatureshopValidation, adminaddflashsaleValidation, admindeleteflashsaleValidation, adminretrievesingleflashsaleValidation, adminadvertValidation, admindeletevertValidation, adminupdateadvertValidation } = require("../core/validation/landingpage");


const router = require("express").Router();

router.post(
  "/create/topcategory",
  admin_check_token,
  createtopcategoryValidation,
  createtopcategoryController
);
router.post(
  "/delete/topcategory",
  admin_check_token,
  createtopcategoryValidation,
  deletetopcategoryController
);
router.post(
  "/retrieve/topcategory",
  admin_check_token,
  adminValidation,
 retrievetopcategoryController
);



router.post(
  "/add/featuredshop",
  admin_check_token,
  adminaddfeatureshopValidation,
 adminaddfeatureshoController
);
router.post(
  "/delete/featuredshop",
  admin_check_token,
  admindeletefeatureshopValidation,
 admindeletefeaturedController
);
router.post(
  "/retrieve/single/featuredshop",
  admin_check_token,
  adminretrievesinglefeatureshopValidation,
 adminretrievefeaturedshopController
);
router.post(
  "/retrieve/all/featuredshop",
  admin_check_token,
  adminValidation,
 adminretrieveallfeaturedshopController
);


router.post(
  "/retrieve/pending/flashsales",
  adminValidation,
  admin_check_token,
  adminretrieveallproductforflashsaleController
);
router.post(
  "/add/flashsale",
  admin_check_token,
  adminaddflashsaleValidation,
 adminaddflashsakeController
);
router.post(
  "/delete/flashsale",
  admin_check_token,
  admindeleteflashsaleValidation,
 admindeleteflashsaleController
);
router.post(
  "/retrieve/single/flashsale",
  admin_check_token,
  adminretrievesingleflashsaleValidation,
 adminretrieveflashsaleController
);
router.post(
  "/retrieve/all/flashsale",
  adminValidation,
  admin_check_token,
 adminretrieveallflashsaleController
);
router.post(
  "/add/todaysale",
  admin_check_token,
  adminaddflashsaleValidation,
 adminaddtodaysakeController
);
router.post(
  "/delete/todaysale",
  admin_check_token,
  admindeleteflashsaleValidation,
 admindeletetodaysaleController
);
router.post(
  "/retrieve/single/todaysale",
  admin_check_token,
  adminretrievesingleflashsaleValidation,
 adminretrievetodaysaleController
);
router.post(
  "/retrieve/all/todaysale",
  adminValidation,
  admin_check_token,
 adminretrievealltodaysaleController
);
router.post(
  "/retrieve/qualified/seller",
  adminValidation,
  admin_check_token,
 adminretrievequalifiedsellerController
);
router.post(
  "/retrieve/qualified/product",
  adminValidation,
  admin_check_token,
 adminretrievequalifiedproductController
);

//advert
router.post(
  "/retrieve/advert",
  adminValidation,
  admin_check_token,
  adminretrieveadvertController
);
router.post(
  "/add/advert",
  adminadvertValidation,
  admin_check_token,
  adminadvertoController
);
router.post(
  "/update/advert",
  adminupdateadvertValidation,
  admin_check_token,
  adminupdateadvertController
);
router.post(
  "/delete/advert",
  admindeletevertValidation,
  admin_check_token,
  admindeleteadvertController
);

module.exports = router