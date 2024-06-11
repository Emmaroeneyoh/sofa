// const { customerordermodel } = require("../../customer/core/db/order");
// const { productreviewModel } = require("../../customer/core/db/productreview");

const { ProductModel } = require("../core/db/product");
const csv = require('csv-parser');
const fs = require('fs');
const { extractproductdata, extractProductData } = require("./extractproductdata");




const createProductModel = async (data, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      images,
      coverimage,
      quantity,
      subcategory,
      variants,  recommended
    } = data;
    const form = new ProductModel({
      name,
      price,
      category,
      description,
      images,
      coverimage,
      quantity,
      subcategory,
      variants,  recommended
    });
    const productDetails = await form.save();
    return productDetails;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};

const blockproductModel = async (data, res) => {
    try {
      const {
        productid
      } = data;
  
      const form = await ProductModel.findByIdAndUpdate(productid , {
          $set: {
             productblocked:true
         }
      });
  
      return form
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
const adminpublishproductModel = async (data, res) => {
    try {
      const {
        filePath
      } = data;
      const products = await extractProductData(filePath)
      // console.log('produst : ' ,products)
      // await ProductModel.deleteMany()
      const uploadproducts = await ProductModel.insertMany(products);
      // console.log('producy' , uploadproducts)
      return 'success'
      // return 'success'
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
const retrievesingleproductModel = async (data, res) => {
    try {
      const {
        productid
      } = data;
  
      const form = await ProductModel.findById(productid).populate()
   
      return form
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
module.exports = {
  createProductModel , retrievesingleproductModel ,  blockproductModel , adminpublishproductModel
  }