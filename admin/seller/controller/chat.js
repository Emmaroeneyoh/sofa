const { sellerticketModel } = require("../../../seller/core/db/ticket");
const {
  sellerretrieveticketModel,
  sellerretrievechatModel,
  sellerchangeticketstatusModel,
} = require("../../../seller/model/suppport");

const adminretrievesellerticketController = async (req, res, next) => {
  const { status } = req.body;
  try {
   
    let comment = await sellerticketModel
      .find({ ticketstatus: status })
      .populate({ path: "sellerid", select: "images" });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminretrievesellerchatController = async (req, res, next) => {
  const { sellerid, ticketid } = req.body;
  try {
    const data = {
      sellerid,
      ticketid,
    };
    let comment = await sellerretrievechatModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const adminchangesellerticketstatusController = async (req, res, next) => {
  const { status, ticketid } = req.body;
  try {
    const data = {
      status,
      ticketid,
    };
    let comment = await sellerchangeticketstatusModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "cart code generated",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  adminretrievesellerticketController,
  adminretrievesellerchatController,  adminchangesellerticketstatusController
};
