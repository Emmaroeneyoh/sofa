const { WalletModel } = require("../core/db/wallet");
const { wallethistoryModel } = require("../core/db/wallethistory");

const customerfundwalletModel = async (datas, res) => {
  try {
    const {  userid,
      walletid,
      amount,
      status, transid, transref, platform , } = datas;
      console.log('payent for funding model',)
    //add to wallet history
    const form = await new wallethistoryModel({
     customerid: userid ,
      walletid,
      amount,
      transactionid : transid  , transref  , status , platform
    });
    await form.save();

    if (status == 'success' || status == 'paid') {
      await WalletModel.findOneAndUpdate(
        { customerid : userid, _id: walletid },
        { $inc: { balance: amount } }
      );
    }

    return "order";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerpaywithcardModel = async (datas, res) => {
  try {
    const {  userid,
      walletid,
      amount,
      status, transid, transref, platform , cardpayment } = datas;
    console.log('payent for card model')
    //add to wallet history
    const form = await new wallethistoryModel({
     customerid: userid ,
      walletid,
      amount,
      transactionid : transid  , transref  , status , platform , cardpayment
    });
    await form.save();

    if (status == 'success') {
      await WalletModel.findOneAndUpdate(
        { customerid : userid, _id: walletid },
        { $inc: { balance: amount } }
      );
    }

    return "order";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};


const customerfundwallethistoryModel = async (data, res) => {
  try {
    const { customerid, walletid } = data;

    const wallethistory = await wallethistoryModel.find({
      customerid,
      walletid,
    });

    const wallet = await WalletModel.findById(walletid)
    const walletbalance = wallet.balance
    const walletdata = { walletbalance , wallethistory }
    return walletdata;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};




module.exports = {
  customerfundwallethistoryModel,
  customerfundwalletModel,  customerpaywithcardModel
};
