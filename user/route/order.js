const { usercreateorderController, userretrivesingleorderController, userretriveallorderController } = require("../app/controller/order");
const { usercreateorderValidation, usersingleorderValidation } = require("../core/validation/product");
const { userValidation } = require("../core/validation/auth");
const { user_check_token } = require("../core/authorization");


const router = require("express").Router();

router.post(
  "/create/order",
  usercreateorderValidation,
  user_check_token,
  usercreateorderController
);
router.post(
  "/retrieve/all/order",
  userValidation,
  user_check_token,
  userretriveallorderController
);
router.post(
  "/retrieve/single/order",
  usersingleorderValidation,
  user_check_token,
  userretrivesingleorderController
);


module.exports = router