const { CustomerModel } = require("../core/db/customer");
const bcrypt = require("bcrypt");
const {
  CustomerUpdateprofileModel,
  CustomerUpdatepasswordModel,
  CustomerupdatephotoModel,
} = require("../model/profile");
const { handleError } = require("../core/utils");
const { WalletModel } = require("../core/db/wallet");
const { customerdeleterequestmodel } = require("../core/db/deleterequest");
const { customerordermodel } = require("../core/db/order");

const CustomerretrieveprofileController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const customer = await CustomerModel.findById(customerid);
    const userwallet = await WalletModel.findOne({ customerid });
    const user = { customer, userwallet };
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerupdateprofileController = async (req, res, next) => {
  const { country, email, phone, name, customerid } = req.body;
  const customerEmail = email.toLowerCase();
  //check if the email exist already , by confirming if the xist email belongs to the current user

  const customer = await CustomerModel.findOne({ email: customerEmail });
  if (customer._id != customerid) {
    return res.status(200).json({
      status_code: 400,
      status: true,
      message: "email already exist",
      error: "email already exist",
    });
  }
  try {
    const data = {
      customerEmail,
      country,
      customerid,
      phone,
      name,
    };

    let trainee = await CustomerUpdateprofileModel(data, res);
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
const CustomerupdatephotoController = async (req, res, next) => {
  const { photo, customerid } = req.body;

  try {
    const data = {
      photo,
      customerid,
    };

    let trainee = await CustomerupdatephotoModel(data, res);
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


const CustomerupdatepasswordController = async (req, res, next) => {
  const { customerid, currentpassword, newpassword } = req.body;
  try {
    const customerDetails = await CustomerModel.findById(customerid);
    if (!customerDetails) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "user dont exist on our application",
        data: [],
        error: "user dont exist on our application",
      });
    }

    const checkPassword = await bcrypt.compare(
      currentpassword,
      customerDetails.password
    );
    if (!checkPassword) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "incorrect password",
        data: [],
        error: "incorrect password",
      });
    }
    const salt = await bcrypt.genSalt();
    const Harshpassword = await bcrypt.hash(newpassword, salt);
    const data = {
      customerid,
      Harshpassword,
    };

    let trainee = await CustomerUpdatepasswordModel(data, res);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const customerdeleterrequestController = async (req, res, next) => {
  const { customerid,reason , name , email} = req.body;
  try {
    const form = await new customerdeleterequestmodel({
      reason , name , email
    });
    const productDetails = await form.save();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: productDetails,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const customerdashboardController = async (req, res, next) => {
  const { customerid} = req.body;
  try {
    const order = await customerordermodel.countDocuments({  customerid });
    const purchasehistory = await customerordermodel.find({  customerid }).limit(5)
    const walletbalance = await WalletModel.findOne({ customerid });
    const dashdata = {order , purchasehistory, walletbalance}
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: dashdata,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  CustomerupdateprofileController,
  CustomerupdatepasswordController,
  CustomerretrieveprofileController,
  CustomerupdatephotoController,
  customerdeleterrequestController, customerdashboardController
};
