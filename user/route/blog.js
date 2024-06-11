const { CustomerretrieveallblogController, CustomeraddreplyController, CustomerretrievesingleblogController, CustomeraddcommentController, CustomerreactblogController, CustomerdeletecommentController, CustomerreactcommentController, CustomerreactreplyController, CustomerdeletereplyController, CustomerretrievesinglecommentController, CustomerretrievesellerblogController, CustomerretrievesellernameblogController } = require("../controller/comment");
const { customer_check_token } = require("../core/authorization");
const { customerValidation } = require("../core/validation/auth");
const { customeraddcommentValidation, customerretrievesingleblogValidation, customerdeletecommentValidation, customersinglecommentValidation, customeraddreplyValidation, customerreactreplyValidation, customerdeletereplyValidation, customerretrieveallblogValidation, customerretrievesellerblogValidation, customerretrievesellernameblogValidation } = require("../core/validation/blog");
const { route } = require("./auth");

const router = require("express").Router();

router.post(
    "/retrieve/all/blog",
    customerretrieveallblogValidation,
  CustomerretrieveallblogController
);
router.post(
    "/retrieve/single/blog",
    customerretrievesingleblogValidation ,
    CustomerretrievesingleblogController
);
router.post(
    "/retrieve/seller/blog",
    customerretrievesellerblogValidation ,
    CustomerretrievesellerblogController
);
router.post(
    "/retrieve/sellername/blog",
    customerretrievesellernameblogValidation,
    CustomerretrievesellernameblogController
);
router.post(
    "/react/blog",
    customerretrievesingleblogValidation,
    customer_check_token ,
    CustomerreactblogController
);
router.post(
    "/delete/comment",
    customerdeletecommentValidation,
    customer_check_token ,
    CustomerdeletecommentController
);
router.post(
    "/add/comment",
    customeraddcommentValidation,
    customer_check_token,
    CustomeraddcommentController
);
router.post(
    "/retrieve/single/comment",
    customersinglecommentValidation,
    customer_check_token,
    CustomerretrievesinglecommentController
);
router.post(
    "/react/comment",
    customersinglecommentValidation,
    customer_check_token,
    CustomerreactcommentController
);


router.post(
    "/add/reply",
    customeraddreplyValidation,
    customer_check_token,
    CustomeraddreplyController
);
router.post(
    "/react/reply",
    customerreactreplyValidation,
    customer_check_token,
    CustomerreactreplyController
);
router.post(
    "/delete/reply",
    customerdeletereplyValidation,
    customer_check_token,
    CustomerdeletereplyController
);

module.exports = router