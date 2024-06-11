const { SellerModel } = require("../../../seller/core/db/seller");
const { adminaprovesellerModel, adminblocksellerModel } = require("../model/account");

const AdminretrievesinglesellerController = async (req, res, next) => {
  const { sellerid } = req.body;
  try {
    let trainee = await SellerModel.findById(sellerid);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminapprovesellerController = async (req, res, next) => {
  const { requestid, sellerid } = req.body;
  try {
    const data = {
      requestid,
      sellerid,
    };

    let trainee = await adminaprovesellerModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminblocksellerController = async (req, res, next) => {
  const { sellerid } = req.body;
  try {
    const data = {
      sellerid,
    };

    let trainee = await  adminblocksellerModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const adminretrieveallsellerController = async (req, res, next) => {
  try {
    let product = await SellerModel.find({
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: product,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  adminretrieveallsellerController,
  adminapprovesellerController,
  AdminretrievesinglesellerController,  adminblocksellerController
};
