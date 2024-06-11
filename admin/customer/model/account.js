const { CustomerModel } = require("../../../customer/core/db/customer");
const { customerordermodel } = require("../../../customer/core/db/order");
const { productreviewModel } = require("../../../customer/core/db/productreview");
const { WalletModel } = require("../../../customer/core/db/wallet");
const { wishlistModel } = require("../../../customer/core/db/wishlist");


const adminretrievesinglecustomerModel = async (data, res) => {
    try {
        const {
            customerid
        } = data;
  
        const profile = await CustomerModel.findById(customerid).select('createdAt name email phone ')
        const wallet = await WalletModel.findOne({ customerid })
        const orders = await customerordermodel.find({customerid})
        const review = await productreviewModel.countDocuments({customerid})
        const wishlist = await wishlistModel.countDocuments({customerid})
        const userdata = {profile , wallet , orders , review , wishlist}
      return userdata
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  

module.exports = {
    adminretrievesinglecustomerModel
}