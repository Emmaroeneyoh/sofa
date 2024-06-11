const { ProductModel } = require("../../seller/core/db/product");
const { CustomerModel } = require("../core/db/customer");
const { customerordermodel } = require("../core/db/order");
const { reorderhistorymodel } = require("../core/db/reorderhistory");
const { sharecartmodel } = require("../core/db/sharecart");
const { viewhistorymodel } = require("../core/db/viewhistory");
const { customerwaitlistModel } = require("../core/db/waitlist");
const { wishlistModel } = require("../core/db/wishlist");
const { handleError } = require("../core/utils");
const {
  customeraddwishlistModel,
  customerremovewishlistModel,
  customerretrievewishlistModel,
} = require("../model/wishlist");

const customeraddwishlistController = async (req, res, next) => {
  const { customerid, item } = req.body;
  try {
  
    const productid = item.productid
    const variantid = item.variantid
    const variantpoduct = item.variantpoduct
    const wishlist = await wishlistModel.findOne({ customerid })
    if (wishlist && variantpoduct) {
      const cart = wishlist.cart
      const checkvariantid = cart.find(item => item.variantid === variantid);
      if ( checkvariantid) {
        return res.status(400).json({
          status_code: 400,
          status: true,
          message: "item already in wishlist",
        });
      }
    }
    if (wishlist && !variantpoduct) {
      const cart = wishlist.cart
      const checkproductid = cart.find(item => item.productid === productid);
      if (checkproductid) {
        return res.status(400).json({
          status_code: 400,
          status: true,
          message: "item already in wishlist",
        });
      }
    }
    
//     if (variantpoduct) {
//       const mywishlist = wishlist.map((x) => x.variantpoduct = variantpoduct)
//       const exist = work.find(item => item.variantid === variantid);
// }

    const data = {
      customerid,
      item
    };

    let trainee = await customeraddwishlistModel(data, res);
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


const customerremovewishlistController = async (req, res, next) => {
  const { customerid, itemid , wishlistid } = req.body;
  try {
    const data = {
      customerid,
      itemid, wishlistid
    };

    let trainee = await customerremovewishlistModel(data, res);
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
const customeraddwaitlistController = async (req, res, next) => {
  const { email} = req.body;
  try {
   
    const form = await new customerwaitlistModel({
   email
    });

    const useraddress = await form.save();
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "successfully added to the waitlist",
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};


const customerretrieveishlistController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = {
      customerid,
     
    };

    let trainee = await customerretrievewishlistModel(data, res);
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
  customeraddwishlistController,
  customerremovewishlistController,
  customerretrieveishlistController, customeraddwaitlistController 
};
