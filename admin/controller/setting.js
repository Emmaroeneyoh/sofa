const {
  paymentplatformmodel,
} = require("../../helper/finance/core/finance.db");
const { invoiceModel } = require("../core/db/setting/invoice");
const { smtpModel } = require("../core/db/setting/smtp");

const createpaymentplatformController = async (req, res, next) => {
  try {
    const paystack = await new paymentplatformmodel({
      platformNumber: 1,
      platformName: "paystack",
      apikey: "sk_test_ceb5afc77c6c0e8bd38e37a0e70ec910f4248d42",
    });

    const paystackplatform = await paystack.save();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const createupdateplatformController = async (req, res, next) => {
  const { platformNumber, apikey } = req.body;
  try {
    const updateaddress = await paymentplatformmodel.updateOne(
      { platformNumber },
      {
        $set: {
          apikey,
        },
      }
    );

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const updateplatformstatusController = async (req, res, next) => {
  const { platformNumber, inUse } = req.body;
  try {
    const updateaddress = await paymentplatformmodel.updateOne(
      { platformNumber },
      {
        $set: {
          inUse,
        },
      }
    );

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const retrieveplatformController = async (req, res, next) => {
  try {
    const updateaddress = await paymentplatformmodel.find();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: updateaddress,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};


const createsmtpcontroller = async (req, res, next) => {
  try {
    // for paystack
    const paystack = await new smtpModel({
      host: "yurei",
      port: 984,
      username: "jjjd",
      password: "ueyeyeiieie",
      mailfromaddress: "uueu",
      mailfromname: "ieoe",
    });

    const paystackplatform = await smtpModel.save();

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const createupdatesmtpController = async (req, res, next) => {
  const { host, port, username, password, mailfromaddress, mailfromname } =
    req.body;
  try {
    const updateaddress = await smtpModel.updateOne(
      { system: "smtp" },
      {
        $set: {
          host,
          port,
          username,
          password,
          mailfromaddress,
          mailfromname,
        },
      }
    );

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const retrievesmtpController = async (req, res, next) => {
  try {
    const updateaddress = await smtpModel.findOne({ system: "smtp" });

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: updateaddress,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const createinvoicecontroller = async (req, res, next) => {
  try {
    // for paystack
    const paystack = await new invoiceModel({
      url: "imega.com",
      address: "no 6 essange street",
      email: "loik@gmail.com",
      phone: "0909873625",
    });
    const paystackplatform = await paystack.save();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

const updateinvoiceController = async (req, res, next) => {
  const { url, phone, email, address } = req.body;
  try {
    const updateaddress = await invoiceModel.updateOne(
      { system: "invoice" },
      {
        $set: {
          url,
          phone,
          email,
          address,
        },
      }
    );

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};
const retrieveinvoiceController = async (req, res, next) => {
  try {
    const updateaddress = await invoiceModel.findOne({ system: "invoice" });

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: updateaddress,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message);
  }
};

module.exports = {
  createpaymentplatformController,
  createupdateplatformController,
  createsmtpcontroller,
  createupdatesmtpController,
  updateplatformstatusController,
  retrieveplatformController,
  retrieveinvoiceController,
  updateinvoiceController,   createinvoicecontroller ,  retrievesmtpController
};
