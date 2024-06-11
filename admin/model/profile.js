const { CustomerModel } = require("../../customer/core/db/customer");
const { customerdeleterequestmodel } = require("../../customer/core/db/deleterequest");
const { sellerdeleterequestmodel } = require("../../seller/core/db/deleterequest");
const { SellerModel } = require("../../seller/core/db/seller");



  const customerapprovedeleterequestModel = async (data, res) => {
    try {
      const { requestid  , customerid} = data;
  
        //update delete reuqest
      const form = await customerdeleterequestmodel.findByIdAndUpdate(requestid , {
        $set: {
            request_approved : true
        },
      });
  
        //update customer
      await CustomerModel.findByIdAndUpdate(customerid , {
        $set: {
            accountdeactivated : true
        },
      });
  
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  const sellerapprovedeleterequestModel = async (data, res) => {
    try {
      const { requestid  , sellerid} = data;
  
        //update delete reuqest
      const form = await sellerdeleterequestmodel.findByIdAndUpdate(requestid , {
        $set: {
            request_approved : true
        },
      });
  
        //update seller
      await SellerModel.findByIdAndUpdate(sellerid , {
        $set: {
            accountdeactivated : true
        },
      });
  
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  
module.exports = {
    customerapprovedeleterequestModel  , sellerapprovedeleterequestModel
}