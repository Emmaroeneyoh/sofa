const {
  paymentplatformmodel,
} = require("../../helper/finance/core/finance.db");
const { createstripeCheckoutSession } = require("../../helper/finance/stripe");
const { generateCheckoutURL, generatebanks } = require("../../helper/paystack");
const { SellerModel } = require("../../seller/core/db/seller");
const { sellerWalletModel } = require("../../seller/core/db/wallet");
const { current_date, expired_date } = require("../../seller/core/utils");
const { sellercreatepackageModel } = require("../../seller/model/package");
const { CustomerModel } = require("../core/db/customer");
const { WalletModel } = require("../core/db/wallet");
const {
  customerfundwalletModel,
  customerfundwallethistoryModel,
  customerpaywithcardModel,
} = require("../model/wallet");

const CustomerfundwalletController = async (req, res, next) => {
  const { data, customer , event} = req.body;
  console.log('data' , data)
  try {
    const packagepayment = data.metadata.packagepayment
    if (packagepayment === 'true') {
      const sellerid = data.metadata.sellerid
      const packageid = data.metadata.packageid
      console.log('payment package' , sellerid , packageid)
      
      const amount = data.metadata.amount
      const  subscribed_date = current_date()
      const  expired_dated = expired_date()
      const packagedata = {
        sellerid ,  packageid , subscribed_date , expired_dated ,  amount
      };
  
      let trainee = await sellercreatepackageModel(packagedata);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully ",
      });
    }
    const usertype = data.metadata.usertype;
    const cardpayment = data.metadata.cardpayment;

    //for card payment
    if (cardpayment === true) {
      if (usertype == "user") {
        const email = data.customer.email;
        const userEmail = email.toLowerCase();
        const user = await CustomerModel.findOne({ email: userEmail });
        const userid = user._id;
        const wallet = await WalletModel.findOne({ customerid: userid });
        const walletid = wallet._id;
        const amount = data.metadata.money;
        const status = data.status;
        const transid = data.id;
        const transref = data.reference;
        const platform = "paystack";
        const datas = {
          userid,
          walletid,
          amount,
          status,
          transid,
          transref,
          cardpayment,
          platform,
        };
        let comment = await customerpaywithcardModel(datas, res);
        return res.status(200).json({
          status_code: 200,
          status: true,
          message: "customer successfully ",
        });
      }
    }

    //for funding wallet
    if (usertype == "user") {
      console.log("its fundind wallet");
      const email = data.customer.email;
      const userEmail = email.toLowerCase();
      const user = await CustomerModel.findOne({ email: userEmail });
      const userid = user._id;
      const wallet = await WalletModel.findOne({ customerid: userid });
      const walletid = wallet._id;
      const amount = data.metadata.money;
      const status = data.status;
      const transid = data.id;
      const transref = data.reference;
      const platform = "paystack";
      const datas = {
        userid,
        walletid,
        amount,
        status,
        transid,
        transref,
        platform,
      };
      let comment = await customerfundwalletModel(datas, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully ",
      });
    }
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerfundwallethistoryController = async (req, res, next) => {
  const { customerid, walletid } = req.body;
  try {
    const data = {
      customerid,
      walletid,
    };
    let comment = await customerfundwallethistoryModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const Customertestaccount = async (req, res, next) => {
  try {
    console.log("server worling");
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "server they",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerretrievepaymentplatformController = async (req, res, next) => {
  try {
    let comment = await paymentplatformmodel.find({ inUse: true });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerretrievebankController = async (req, res, next) => {
  try {
    let comment = await generatebanks()
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const usermakepaymentController = async (req, res, next) => {
  const { email, amount, usertype, customerid, cardpayment, platformNumber } =
    req.body;
  try {
    let checkouturl;
    if (platformNumber == 1) {
      let paystackcheckout = await generateCheckoutURL(
        email,
        amount,
        usertype,
        cardpayment,
        platformNumber
      );
      if (!paystackcheckout) {
        return res.status(400).json({
          status_code: 400,
          status: true,
          message: "transaction failed",
          data: paystackcheckout,
        });
      }
      checkouturl = paystackcheckout;
    } else if (platformNumber == 2) {
      let stripecheckout = await createstripeCheckoutSession(
        usertype,
        customerid,
        amount,
        cardpayment,
        platformNumber
      );
      if (!stripecheckout) {
        return res.status(400).json({
          status_code: 400,
          status: true,
          message: "transaction failed",
          data: stripecheckout,
        });
      }
      checkouturl = stripecheckout;
    }

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: checkouturl,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
module.exports = {
  CustomerfundwallethistoryController,
  CustomerfundwalletController,
  usermakepaymentController,
  CustomerretrievepaymentplatformController, Customertestaccount , CustomerretrievebankController
};
