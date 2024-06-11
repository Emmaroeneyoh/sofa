const { customerordermodel } = require("../../../customer/core/db/order");
const { handleError } = require("../../core/utils");
const {
  adminconfirmcustomerorderModel,
  blockcustomerModel,
  adminqueryorderstatusModel,
} = require("../model/order");

const adminretrieveallcustomerorderController = async (req, res, next) => {
  try {
    let trainee = await customerordermodel.find({ order_status: "pending" });
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
const adminretrievesinglecustomerorderController = async (req, res, next) => {
  const { orderid } = req.body;

  try {
    const data = { orderid };

    let trainee = await customerordermodel.findById(orderid);
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
const adminretrievecustomerorderController = async (req, res, next) => {
  const { customerid } = req.body;

  try {
    const data = { customerid };

    let trainee = await customerordermodel.find({ customerid });
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

const adminconfirmcustomerorderController = async (req, res, next) => {
  const { orderid, adminid } = req.body;

  try {
    const order = await customerordermodel.findById(orderid);
    if (order.order_approved == true) {
      return res.status(400).json({
        status_code: 400,
        status: true,
        message: "order already approved",
      });
    }
    const data = { orderid, adminid };

    let trainee = await adminconfirmcustomerorderModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "order confirm",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminqueryorderController = async (req, res, next) => {
  const { orderid, adminid, status } = req.body;

  try {
    const data = { orderid, adminid, status };

    let trainee = await adminqueryorderstatusModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "order confirm",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminretrievequeryorderController = async (req, res, next) => {
  try {
    let trainee = await customerordermodel.find({ queryorder: true });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "order confirm",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  adminretrieveallcustomerorderController,
  adminretrievesinglecustomerorderController,
  adminconfirmcustomerorderController,
  adminretrievecustomerorderController,
  adminqueryorderController,
  adminretrievequeryorderController,
};
