const { OrderModel } = require("../../core/db/order");
const { usercreateorderModel } = require("../model/order");

const usercreateorderController = async (req, res, next) => {
  const { orderItem } = req.body;
  try {
    const data = {
      orderItem,
    };
    let trainee = await usercreateorderModel(data, res);
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

const userretriveallorderController = async (req, res, next) => {
  try {
    const { userid } = req.body;
    let comment = await OrderModel.find({ userid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "order retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const userretrivesingleorderController = async (req, res, next) => {
  try {
    const { orderid } = req.body;
    let comment = await OrderModel.findById(orderid);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "product retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  userretrivesingleorderController,
  userretriveallorderController,
  usercreateorderController,
};
