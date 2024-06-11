
const { SellerModel } = require("../../seller/core/db/seller");
const { CustomerModel } = require("../core/db/customer");


const customerfollowstoreModel = async (data, res) => {
    try {
      const { customerid, sellerid } = data;
      const form = await CustomerModel.findByIdAndUpdate(customerid, {
        $push: {
          followed_store: {storeid:sellerid}
        },
      });
      await SellerModel.findByIdAndUpdate(sellerid, {
        $inc: {
            totalfollowers : 1
        },
      });
      
      return true;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
const customerunfollowstoreModel = async (data, res) => {
    try {
      const { customerid, sellerid } = data;
      const form = await CustomerModel.findByIdAndUpdate(customerid, {
        $pull: {
          followed_store: {storeid:sellerid}
        },
      });

      await SellerModel.findByIdAndUpdate(sellerid, {
        $inc: {
            totalfollowers : -1
        },
      });
      return false;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
const customerretrievefollowstoreModel = async (data, res) => {
    try {
      const { customerid } = data;
        const customer = await CustomerModel.findById(customerid);
        const wishlist = customer.followed_store.map((x) => {
            return x.storeid
        })
        const products = await SellerModel.find({_id : wishlist})
      return products;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  
module.exports = {
    customerfollowstoreModel , customerunfollowstoreModel , customerretrievefollowstoreModel
}