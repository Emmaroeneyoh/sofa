const { BrandModel } = require("../../admin/core/db/brand");
const { CategoryModel } = require("../../admin/core/db/category");
const { ProductModel } = require("../../seller/core/db/product");
const { SellerModel } = require("../../seller/core/db/seller");
const { CustomerModel } = require("../core/db/customer");
const { customerordermodel } = require("../core/db/order");
const { productreviewModel } = require("../core/db/productreview");
const { handleError } = require("../core/utils");
const {
  customerproductreviewModel,
  customerretrievesingleproductModel,
} = require("../model/productrelated");

const userproductnamesearchController = async (req, res, next) => {
  try {
    const { name } = req.body;
    let trainee = await ProductModel.find({ $text: { $search: name } });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const userproductnameController = async (req, res, next) => {
  try {
    const { name } = req.body;
    let trainee = await ProductModel.find({ $text: { $search: name } }).select(
      "name"
    );
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "login process successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerreviewproductController = async (req, res, next) => {
  const { customerid, sellerid, rating, productid, review } = req.body;
  try {
    const data = {
      customerid,
      productid,
      review,
      sellerid,
      rating,
    };
    let comment = await customerproductreviewModel(data, res);
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

//retrieve all brands
const CustomerretrieveallbrandController = async (req, res, next) => {
  try {
    let brand = await BrandModel.find();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: brand,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerretrieveallcategoryController = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find().sort({
      product_purchased: -1,
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: categories,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const customerretrievecategoryproductController = async (req, res, next) => {
  try {
    const { category } = req.body;
    let product = await ProductModel.find({
      parentcategory: category,
    }).populate({
      path: "sellerid",
      select: "store_address",
    });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const customerretrievebrandproductController = async (req, res, next) => {
  try {
    const { brand } = req.body;
    let product = await ProductModel.find({ brand });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const customerfilterproductcontroller = async (req, res, next) => {
  try {
    const { category, brand } = req.body;
    var query = { $and: [] };

    if (category != "") {
      query.$and.push({ category: category });
    }

    if (brand != "") {
      query.$and.push({ brand: brand });
    }

    const product = await ProductModel.find(query);

    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "all users logs retrieved",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const customerretrievesellerproductController = async (req, res, next) => {
  try {
    const { seller } = req.body;
    let product = await ProductModel.find({ sellerid: seller });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const customerretrieveallsellerController = async (req, res, next) => {
  try {
    const { customerid } = req.body;
  
    let sellers = await SellerModel.find();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data:  sellers,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerretrievesingleproductController = async (req, res, next) => {
  const { productid , customerid } = req.body;
  try {
    const data = { productid , customerid };
    const productdata = await customerretrievesingleproductModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: productdata,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerretrieveallproductController = async (req, res, next) => {
  try {
    const { customerid } = req.body;
  
    let sellers = await ProductModel.find();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data:  sellers,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  CustomerreviewproductController,
  CustomerretrievesingleproductController,
  CustomerretrieveallbrandController,
  customerretrievecategoryproductController,
  CustomerretrieveallcategoryController,
  customerretrievesellerproductController,
  userproductnamesearchController,
  userproductnameController,
  customerretrievebrandproductController,
  customerfilterproductcontroller,
  customerretrieveallsellerController, CustomerretrieveallproductController
};
