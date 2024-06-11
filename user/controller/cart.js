const { createProductController } = require("../../seller/controller/product");

const { cartmodel } = require("../core/db/cart");
const {
  customercreatecartModel,
  customeradditemtocartcartModel,
  customersubtractitemtocartcartModel,
} = require("../model/cart");

const CustomercreatecartController = async (req, res, next) => {
  const { customerid, sellerid, productid, delivery_fee, price, totalfee , variantid ,  variantpoduct} =
    req.body;
  try {
 
    const data = {
      customerid,
      sellerid,
      productid,
      delivery_fee,
      price,
      totalfee, variantid ,  variantpoduct
    };
    let comment = await customercreatecartModel(data, res);
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
const CustomeraddcartitemController = async (req, res, next) => {
  const { cartid } = req.body;
  try {
    const data = {
      cartid,
    };
    let comment = await customeradditemtocartcartModel(data, res);
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
const CustomersubtractcartitemController = async (req, res, next) => {
  const { cartid } = req.body;
  try {
    const data = {
      cartid,
    };
    let comment = await customersubtractitemtocartcartModel(data, res);
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

const CustomerretrievecartController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    let comment = await cartmodel.find({ customerid });
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
const CustomerdeletecartController = async (req, res, next) => {
  const { cartid } = req.body;
  try {
    let comment = await cartmodel.findByIdAndDelete(cartid);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "product removed from cart",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  CustomercreatecartController,
  CustomerretrievecartController,
  CustomerdeletecartController,
  CustomersubtractcartitemController,  CustomeraddcartitemController
};
