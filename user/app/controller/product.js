const { CategoryModel } = require("../../../admin/core/db/category");
const { ProductModel } = require("../../../admin/core/db/product");
const { subcategoryModel } = require("../../../admin/core/db/subcategory");
const { OrderModel } = require("../../core/db/order");
const { handleError } = require("../../core/utils");

const userretriveallproductController = async (req, res, next) => {
  try {
    // const page = req.body.page || 1;
    // const limit = 50;
    // let skip = (page - 1) * limit;
    // const products = await ProductModel.find()
    // .skip(skip) // skip documents
    // .limit(limit); // limit results per page
    let comment = await ProductModel.find().limit(10);
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
const userretrivesingleproductController = async (req, res, next) => {
  try {
    const { productid } = req.body;
    let comment = await ProductModel.findById(productid);
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
const userretrivecategoryController = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();
    const categoryset = []
    for (let category of categories) {
      const subcategories = await subcategoryModel.find({
        category: category._id,
      });
      const catitem = {
        "category": category.category,
        "categoryurl": category.categoryurl,
        "subcategory": subcategories,
        
      }
      categoryset.push(catitem)
    }

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "product retrieved",
      data: categoryset,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const userdashboardController = async (req, res, next) => {
  try {
    const {userid}  = req.body
    const pendingorder = await OrderModel.countDocuments({userid , status:"pending"});
    const deliveredorder = await OrderModel.countDocuments({userid , status:"delivered"});
    const shippingorder = await OrderModel.countDocuments({userid , status:"shipping"});
    const totalorder = await OrderModel.countDocuments({userid });
    const allorder = await OrderModel.find({userid }).limit(10)
  
    const orderdata = {pendingorder , deliveredorder , shippingorder , totalorder , allorder}
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "product retrieved",
      data: orderdata,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};

module.exports = {
  userretrivesingleproductController,
  userretriveallproductController,
  userretrivecategoryController,  userdashboardController
};
