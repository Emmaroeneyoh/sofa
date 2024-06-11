const { ProductModel } = require("../../../seller/core/db/product");
const { todaysalemodel } = require("../../core/db/landingpage/todaysale");
const { handleError } = require("../../core/utils");
const { adminaddflashsaleModel } = require("../../model/landingpage/flashsale");
const { adminaddtodaysaleModel } = require("../../model/landingpage/todaysale");

const adminaddtodaysakeController = async (req, res, next) => {
  const { productid } = req.body;
  try {
    const checkbrand = await todaysalemodel.findOne({ productid });
    if (checkbrand) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "product already on todaysale",
        error: "product already on todaysale",
      });
    }

    const data = {
      productid,
    };

    let trainee = await adminaddtodaysaleModel(data, res);
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

const adminretrievetodaysaleController = async (req, res, next) => {
  const { productid } = req.body;
  try {
    const brand = await ProductModel.findById(productid);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: brand,
    });
  } catch (error) {
    console.log(error);
   return handleError(error.message)(res);
  }
};

const adminretrievealltodaysaleController = async (req, res, next) => {
  try {
    const cat = await todaysalemodel.find().populate({
      path: "productid",
      select: "name price",
    });

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: cat,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

const admindeletetodaysaleController = async (req, res, next) => {
  const { todaysaleid } = req.body;
  try {
    let trainee = await todaysalemodel.findByIdAndDelete(todaysaleid);
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

const adminretrieveallproductfortodayController = async (
  req,
  res,
  next
) => {
  const data = ''
  try {
    let trainee = await adminretrieveproductforflashsaleModel(data, res);
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
module.exports = {
  adminaddtodaysakeController,
  admindeletetodaysaleController,
  adminretrievealltodaysaleController, adminretrievetodaysaleController
};
