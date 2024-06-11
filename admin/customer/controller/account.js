const { CustomerModel } = require("../../../customer/core/db/customer");
const { customerwaitlistModel } = require("../../../customer/core/db/waitlist");
const { sendGroupEmail } = require("../../../helper/email");
const { adminretrievesinglecustomerModel } = require("../model/account");
const { blockcustomerModel } = require("../model/order");

const adminblockcustomerController = async (req, res, next) => {
  const { customerid } = req.body;

  try {
    const data = { customerid };
    let trainee = await blockcustomerModel(data, res);
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
const adminretrievesinglecustomerController = async (req, res, next) => {
  const { customerid } = req.body;

  try {
    let data = {customerid}
    let trainee = await  adminretrievesinglecustomerModel(data , res);
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
const adminretrieveallController = async (req, res, next) => {
  try {
    let trainee = await CustomerModel.find();
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

// mailing users
const adminretrievebothsubcribersanduseremailController = async (
  req,
  res,
  next
) => {
  try {
    const subscribedusers = await customerwaitlistModel.find().select("email createdAt");
    const normalusers = await CustomerModel.find().select("email  createdAt");
    const userdatas = { subscribedusers, normalusers };
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: userdatas,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};


const adminsendnewsletterController = async (req, res, next) => {
  try {
    const { emails, subject, content } = req.body;
    const templateFile = "email.ejs";
    sendGroupEmail(emails, subject, templateFile, content);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  adminblockcustomerController,
  adminretrievesinglecustomerController,
  adminretrieveallController,
  adminsendnewsletterController,
  adminretrievebothsubcribersanduseremailController,
};
