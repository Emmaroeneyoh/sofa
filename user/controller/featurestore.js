const { CustomerModel } = require("../core/db/customer");
const { handleError } = require("../core/utils");
const {
  customerfollowstoreModel,
  customerunfollowstoreModel,
  customerretrievefollowstoreModel,
} = require("../model/followedstore");

const customerfollowstoreController = async (req, res, next) => {
  const { customerid, sellerid } = req.body;
  try {
    const customer = await CustomerModel.findById(customerid);
    //lets do a check to ensure that the categories dont exist twice
    const customerstore = customer.followed_store;
    let checkstore = false;
    customerstore.map((x) => {
        if (x.storeid == sellerid) {
        checkstore = true;
      }
    });

    if (checkstore) {
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "already following store",
      });
    }
    const data = {
      customerid,
      sellerid,
    };

    let trainee = await customerfollowstoreModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const customerunfollowstoreController = async (req, res, next) => {
  const { customerid, sellerid } = req.body;
  try {
    const data = {
      customerid,
      sellerid,
    };

    let trainee = await customerunfollowstoreModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const customerretrievefollowedstoreController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = {
      customerid,
    };

    let trainee = await customerretrievefollowstoreModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  customerretrievefollowedstoreController,
  customerunfollowstoreController,
  customerfollowstoreController,
};
