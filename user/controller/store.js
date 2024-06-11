const { sellervisitor } = require("../../seller/core/db/visitor");
const {
  customervisitstoreModel,
  customerretrievestoreModel,
  customerretrievesubcateoryModel,
} = require("../model/store");
const { CustomerModel } = require("../core/db/customer");
const { SellerCategory } = require("../../seller/core/db/category");
const { ProductModel } = require("../../seller/core/db/product");

const CustomervisitstoreController = async (req, res, next) => {
  const { sellerid } = req.body;
  const ipaddress = req.ip;
  try {
    const visitor = await sellervisitor.findOne({ ipaddress, sellerid });
    if (visitor) {
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "user already a visitor",
      });
    }
    const data = { sellerid, ipaddress };
    let comment = await customervisitstoreModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "done",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerretrievestoreController = async (req, res, next) => {
  const { sellerid , customerid } = req.body;
  try {
    const data = { sellerid ,  customerid };
    let comment = await customerretrievestoreModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "done",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomersellersubcategoryController = async (req, res, next) => {
  const { sellerid, categoryid } = req.body;
  try {
    const data = { sellerid, categoryid };
    let comment = await customerretrievesubcateoryModel(data, res);
    console.log('ksim')
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "done",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res)
  }
};
const CustomerstoreproductController = async (req, res, next) => {
  const { sellerid, subcategoryid } = req.body;
  try {
    const data = { sellerid, subcategoryid };
    let comment = await ProductModel.find({ subcategory: subcategoryid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "done",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomersellercategoryController = async (req, res, next) => {
  const { sellerid } = req.body;
    try {
      
    let comment = await SellerCategory.find({ sellerid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "done",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  CustomervisitstoreController,
  CustomerretrievestoreController,
  CustomersellersubcategoryController,
  CustomersellercategoryController,  CustomerstoreproductController
};
