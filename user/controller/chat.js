const { riderJWT } = require("../../helper/utils");
const { RiderModel } = require("../../rider/core/db/rider");
const { customerdispatchModel } = require("../core/db/chat");
const { customersupporthModel } = require("../core/db/support");

const CustomerretrieveridersController = async (req, res, next) => {
  try {
    let comment = await RiderModel.find().select("name photo");
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const CustomerriderchatController = async (req, res, next) => {
  try {
    const { customerid } = req.body;
    let comment = await customerdispatchModel.find({
      users: {
        $in: customerid,
      },
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const CustomersupportController = async (req, res, next) => {
  try {
    const { customerid } = req.body;
    let comment = await customersupporthModel.find({ customerid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  CustomerriderchatController,
  CustomerretrieveridersController,
  CustomersupportController,
};
