const { customerordermodel } = require("../core/db/order");
const { WalletModel } = require("../core/db/wallet");
const { handleError } = require("../core/utils");
const {
  customeraddorderModel,
  customerretrieveallorderModel,
  customerretrievesingleorderModel,
  customerconfirmorderModel,
  customerchangeorderstatusdashxModel,
  customerretrieveactiveordermodel,
} = require("../model/order");

const customeraddorderController = async (req, res, next) => {
  const { customerid, cart, use_wallet, price, shippingaddressid } = req.body;
  try {
    //check if the customer balance is enough
    const wallet = await WalletModel.findOne({ customerid });
    const balance = wallet.balance;
    if (use_wallet) {
      if (price > balance) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "insufficient fund",
        });
      }
    }
    const data = {
      cart,
      customerid,
      use_wallet,
      price,
      shippingaddressid,
    };

    let trainee = await customeraddorderModel(data, res);

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
const customerretrieveallordercontroller = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = { customerid };

    let trainee = await customerretrieveallorderModel(data, res);
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
const customerretrieveactiveordercontroller = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = {
      customerid
    }
    let findorder = await customerordermodel.find({ customerid, order_status: 'pending' });
   
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: findorder,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const customerretrievecompletedordercontroller = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    let trainee = await customerordermodel.find({
      customerid,
      order_status: "delivered",
    });
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
const customerretrievecancelorderordercontroller = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    let trainee = await customerordermodel.find({
      customerid,
      ordercancel: true,
    });
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
const customerretrievesingleordercontroller = async (req, res, next) => {
  const { orderid } = req.body;
  try {
    const data = { orderid };

    let trainee = await customerretrievesingleorderModel(data, res);
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
const customerconfirmordercontroller = async (req, res, next) => {
  const { orderid } = req.body;
  try {
    const data = { orderid };

    let trainee = await customerconfirmorderModel(data, res);
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
const customerchangeorderstatusdashxcontroller = async (req, res, next) => {
  const { trackingid, status } = req.body;
  try {
    const data = { trackingid, status };

    let trainee = await customerchangeorderstatusdashxModel(data, res);
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
  customeraddorderController,
  customerretrieveallordercontroller,
  customerconfirmordercontroller,
  customerretrievesingleordercontroller,
  customerchangeorderstatusdashxcontroller,
  customerretrievecancelorderordercontroller,
  customerretrievecompletedordercontroller, customerretrieveactiveordercontroller
};
