const {
  customerdeleterequestmodel,
} = require("../../customer/core/db/deleterequest");
const {
  sellerdeleterequestmodel,
} = require("../../seller/core/db/deleterequest");
const {
  customerapprovedeleterequestModel,
  sellerapprovedeleterequestModel,
} = require("../model/profile");

//for user
const customerretrievedeleterequestController = async (req, res, next) => {
  const { requestid } = req.body;
  try {
    let trainee = await customerdeleterequestmodel.findById(requestid);
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
const customerapprovedeleterequestController = async (req, res, next) => {
  const { requestid, customerid } = req.body;
  try {
    const data = {
      requestid,
      customerid,
    };

    let trainee = await customerapprovedeleterequestModel(data, res);
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

const customeretrievealldeleterequestController = async (req, res, next) => {
  try {
    let product = await customerdeleterequestmodel.find({
      request_approved: false,
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

//for seller

const sellerretrievedeleterequestController = async (req, res, next) => {
  const { requestid } = req.body;
  try {
    let trainee = await sellerdeleterequestmodel.findById(requestid);
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
const sellerapprovedeleterequestController = async (req, res, next) => {
  const { requestid, sellerid } = req.body;
  try {
    const data = {
      requestid,
      sellerid,
    };

    let trainee = await sellerapprovedeleterequestModel(data, res);
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

const selleretrievealldeleterequestController = async (req, res, next) => {
  try {
    let product = await sellerdeleterequestmodel.find({
      request_approved: false,
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
  customerretrievedeleterequestController,
  customerapprovedeleterequestController,
  customeretrievealldeleterequestController,
  sellerretrievedeleterequestController,
  selleretrievealldeleterequestController,  sellerapprovedeleterequestController
};
