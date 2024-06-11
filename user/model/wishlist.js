const { ProductModel } = require("../../seller/core/db/product");
const { CustomerModel } = require("../core/db/customer");
const { wishlistModel } = require("../core/db/wishlist");
const mongoose = require('mongoose');


const customeraddwishlistModel = async (data, res) => {
    try {
      const { customerid, item } = data;

      const itemId = new mongoose.Types.ObjectId();
      const items = { ...item, _id: itemId }
     
      const checkwishlist = await wishlistModel.findOne({ customerid })
      if (checkwishlist) {
        const form = await wishlistModel.findByIdAndUpdate(checkwishlist._id, {
          $push: {
            cart: items
          },
        });
        return form;
      }

      const form = await new wishlistModel({
        customerid,
       
      });
      form.cart = items;
      const useraddress = await form.save();
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
const customerremovewishlistModel = async (data, res) => {
    try {
      const { customerid, itemid, wishlistid } = data;
      console.log('poli' , itemid, wishlistid)
      const variantObjectId = new mongoose.Types.ObjectId(itemid)
      const form = await wishlistModel.findByIdAndUpdate(wishlistid, {
        $pull: {
          cart: { _id: variantObjectId  }
        },
      });
      if (!form) {
        console.log('Document not found');
    } else {
        console.log('Item removed from cart:', form);
    }
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
const customerretrievewishlistModel = async (data, res) => {
    try {
      const { customerid } = data;
      const customer = await wishlistModel.findOne({ customerid });
       
      return customer;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  
module.exports = {
    customeraddwishlistModel , customerremovewishlistModel , customerretrievewishlistModel
}