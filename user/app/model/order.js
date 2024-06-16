const { OrderModel } = require("../../core/db/order");


const usercreateorderModel = async (data, res) => {
    try {
      const {
        orderItem
      } = data;
  
        const form = await OrderModel.insertMany(orderItem);
    //   const productDetails = await form.save()
     
  
      return 'success';
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};

module.exports = {
    usercreateorderModel
}