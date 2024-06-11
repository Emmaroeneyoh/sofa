const { customerticketModel } = require("../../../customer/core/db/ticket");
const {
  customerretrieveticketModel,
  customerretrievechatModel,
  customerupdateticketstatusModel,
} = require("../../../customer/model/support");

const adminretrieveticketController = async (req, res, next) => {
  const { status} = req.body;
  try {
    let comment = await customerticketModel
      .find({ ticketstatus: status })
      .populate({ path: "customerid", select: "photo" });
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
const adminretrievechatController = async (req, res, next) => {
  const { customerid, ticketid } = req.body;
  try {
    const data = {
      customerid,
      ticketid,
    };
    let comment = await customerretrievechatModel(data, res);
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
const adminchangestatusController = async (req, res, next) => {
  const { customerid, ticketid , status } = req.body;
  try {
    const data = {
      customerid,
      ticketid, status
    };
    let comment = await customerupdateticketstatusModel(data, res);
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
  adminretrievechatController,
  adminretrieveticketController, adminchangestatusController
};
