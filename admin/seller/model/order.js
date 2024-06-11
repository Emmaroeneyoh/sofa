const { sellerordermodel } = require("../../../seller/core/db/order");


const adminconfirmsellerorderModel = async (data, res) => {
    try {
      const { orderid , adminid } = data;
    
      const updateaddress = await sellerordermodel.findByIdAndUpdate(orderid, {
        $set: {
              pickup_station : {
                item_delivered : true , adminid
        }
        },
      });
      return updateaddress;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};
  
module.exports = {
    adminconfirmsellerorderModel
}
  
