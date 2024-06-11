const { ProductModel } = require("../core/db/product");
const { handleError } = require("../core/utils");
const path = require('path')
const {
  retrievesingleproductModel,
  blockproductModel,
  createProductModel,
  adminpublishproductModel,
} = require("../model/product");



const createProductController = async (req, res, next) => {
  const {
    productname,
    category,
    productprice,
    productdescription,
    images,
    coverimage,
    quantity,
    subcategory,
    variants,  recommended
  } = req.body;
  const name = productname.toLowerCase();
  const price = productprice;

  const description = productdescription;

  try {
  
    const data = {
      name,
      price,
      productname,
      category,
      productprice,
      description,
      images,
      coverimage,
      quantity,
      subcategory,
      variants,  recommended
    };

    let trainee = await createProductModel(data, res);
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

const updateProductController = async (req, res, next) => {
  const {
    productname,
    category,
    sellerid,
    productid,
    productprice,

    productdescription,
    images,
    isdiscount,
    discount_price,
    discount_startdate,
    discount_enddate,
    quantity,
    delivery_vehicle,
    subcategory,
    variants,
    vehicle_fee,
    productinfo,
    about,
    gallerydescription,
    max_quantity,
    min_quantity, productpublished
  } = req.body;
  const name = productname.toLowerCase();
  const price = productprice;

  const description = productdescription;
  try {
    const data = {
      name,
      price,

      images,
      isdiscount,
      discount_price,
      discount_startdate,
      discount_enddate,
      description,
      category,
      sellerid,
      productid,
      quantity,
      delivery_vehicle,
      subcategory,
      variants,
      vehicle_fee,
      productinfo,
      about,
      gallerydescription,
      max_quantity,
      min_quantity, productpublished
    };

    let trainee = await updateProductModel(data, res);
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
const adminpublishproductController = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "no file uploaded",
      });
    }
    //vaidating csv
    const ext = path.extname(req.file.originalname);
    if (ext !== '.csv') {
      return res.status(400).json({
        status_code: 400,
        status: false,
        message: "only csv file",
      });
    }
    const filePath = req.file.path;
    console.log('file' , filePath)
    const data = {
      filePath
    };

    let trainee = await adminpublishproductModel(data, res);
    // console.log('pro :' , trainee)
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "product published successful",
      data: trainee,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
const retrievesingleproductController = async (req, res, next) => {
  const { productid } = req.body;
  try {
    const data = {
      productid,
    };

    let trainee = await retrievesingleproductModel(data, res);
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
const adminblockproductController = async (req, res, next) => {
  const { productid } = req.body;
  try {
    const data = {
      productid,
    };

    let trainee = await blockproductModel(data, res);
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

const retrieveallproductController = async (req, res, next) => {
  try {
    const page = req.body.page || 1;
    const limit = 50;
    let skip = (page - 1) * limit;
    const products = await ProductModel.find()
    .skip(skip) // skip documents
    .limit(limit); // limit results per page

  // Get total count of documents for pagination
    const totalDocuments = await ProductModel.countDocuments();
    const productdata = {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalDocuments / limit),
      totalItems: totalDocuments
    }
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "signup process successful",
      data: productdata,
    });
  } catch (error) {
    console.log(error);
    handleError(error.message)(res);
  }
};
// const retrieveallproductreveiewController = async (req, res, next) => {
//   try {
//     let product = await productreviewModel.find().populate([
//       { path: "customerid", select: " name email phone" },
//       { path: "productid", select: " description coverphoto" },
//     ]);

//     return res.status(200).json({
//       status_code: 200,
//       status: true,
//       message: "signup process successful",
//       data: product,
//     });
//   } catch (error) {
//     console.log(error);
//     handleError(error.message)(res);
//   }
// };

module.exports = {
  retrievesingleproductController,
  retrieveallproductController,
  // retrieveallproductreveiewController,
  adminblockproductController,  createProductController ,  adminpublishproductController 
};
