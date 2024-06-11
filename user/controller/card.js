const { CardModel } = require("../core/db/card");
const crypto = require("crypto");
const { encryptcard } = require("../core/utils");
const { cardsecret } = require("../../helper/utils");
const {
  customercreatecardModel,
  customerupdatecardModel,
  customersetdefaultcardModel,
  customerretrievedefaultcardModel,
} = require("../model/card");

const CustomercreatecardController = async (req, res, next) => {
  const { customerid, card_number, card_name, card_cvv, expire_date } =
    req.body;
  try {
    const checkcard = await CardModel.findOne({ customerid, card_number });
    if (checkcard) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "card already exist",
        error: "card already exist",
      });
    }
    const encyrptnumber = encryptcard(card_number, cardsecret);
    const encyrptcvv = encryptcard(card_cvv, cardsecret);
    const data = {
      customerid,
      encyrptnumber,
      encyrptcvv,
      card_name,
      expire_date,
    };
    let comment = await customercreatecardModel(data, res);
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

const CustomerupdatecardController = async (req, res, next) => {
  const { customerid, card_number, card_name, card_cvv, expire_date, cardid } =
    req.body;
  try {
    const encyrptnumber = encryptcard(card_number, cardsecret);
    const encyrptcvv = encryptcard(card_cvv, cardsecret);
    const data = {
      encyrptnumber,
      encyrptcvv,
      card_name,
      expire_date,
      cardid,
    };
    let comment = await customerupdatecardModel(data, res);
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

const CustomerretrievesinglecardController = async (req, res, next) => {
  const { cardid } = req.body;
  try {
    let comment = await CardModel.findById(cardid);
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
const CustomerdeletecardController = async (req, res, next) => {
  const { cardid } = req.body;
  try {
    let comment = await CardModel.findByIdAndDelete(cardid);
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
const CustomerretrieveallcardController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    let comment = await CardModel.find({ customerid });
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

const CustomersetdefaultcardController = async (req, res, next) => {
  const { cardid, customerid } = req.body;
  try {
    const data = {
      cardid,
      customerid,
    };
    let comment = await customersetdefaultcardModel(data, res);
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

const CustomerretrievedefaultcardController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = {
      customerid,
    };
    let address = await customerretrievedefaultcardModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: address,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
module.exports = {
  CustomercreatecardController,
  CustomerupdatecardController,
  CustomerretrievesinglecardController,
  CustomerretrieveallcardController,
  CustomerretrievesinglecardController,
  CustomerdeletecardController,
  CustomerretrievedefaultcardController,
  CustomersetdefaultcardController,
};
