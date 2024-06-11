const {
  customercreateticketModel,
  customerretrieveticketModel,
  customerretrievechatModel,
} = require("../model/support");

const CustomercreateticketController = async (req, res, next) => {
  const { request, customerid } = req.body;
  try {
    const data = {
      request,
      customerid,
    };
    let comment = await customercreateticketModel(data, res);
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
const CustomerretrieveticketController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = {
      customerid,
    };
    let comment = await customerretrieveticketModel(data, res);
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
const CustomerretrievechatController = async (req, res, next) => {
  const { customerid , ticketid } = req.body;
  try {
    const data = {
      customerid, ticketid
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

module.exports = {
  CustomerretrievechatController,
  CustomerretrieveticketController,
  CustomercreateticketController,
};
