const { ProductModel } = require("../../../seller/core/db/product");
const { flashsalemodel } = require("../../core/db/landingpage/flashsale");
const { handleError } = require("../../core/utils");
const {
  adminaddflashsaleModel,
  adminretrieveproductforflashsaleModel,
} = require("../../model/landingpage/flashsale");

const adminaddflashsakeController = async (req, res, next) => {
  const { productid } = req.body;
  try {
    const checkbrand = await flashsalemodel.findOne({ productid });
    if (checkbrand) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "product already on flashsale",
        error: "product already on flashsale",
      });
    }

    const data = {
      productid,
    };

    let trainee = await adminaddflashsaleModel(data, res);
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

const adminretrieveflashsaleController = async (req, res, next) => {
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

const adminretrieveallflashsaleController = async (req, res, next) => {
  try {
    const cat = await flashsalemodel.find().populate({
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
const adminretrieveallproductforflashsaleController = async (
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

const admindeleteflashsaleController = async (req, res, next) => {
  const { flashsaleid } = req.body;
  try {
    let trainee = await flashsalemodel.findByIdAndDelete(flashsaleid);
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

module.exports = {
  adminaddflashsakeController,
  admindeleteflashsaleController,
  adminretrieveallflashsaleController,
  adminretrieveflashsaleController,
  adminretrieveallproductforflashsaleController,
};
