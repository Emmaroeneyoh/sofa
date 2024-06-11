const { SellerModel } = require("../../../seller/core/db/seller");


  const adminaprovesellerModel = async (data, res) => {
    try {
      const { sellerid} = data;
  
  
        //update seller
      await SellerModel.findByIdAndUpdate(sellerid , {
        $set: {
            storeapproved : true
        },
      });
  
      return 'sucess';
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  const adminblocksellerModel = async (data, res) => {
    try {
      const { sellerid} = data;
  
  
        //update seller
      await SellerModel.findByIdAndUpdate(sellerid , {
        $set: {
            sellerblocked: true
        },
      });
  
      return 'sucess';
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};

module.exports = {
    adminaprovesellerModel ,  adminblocksellerModel
}