const { BrandModel } = require("../../../seller/core/db/brand");



const approvebrandModel = async (data, res) => {
    try {
      const {
      brandid
      } = data;
  
      const form = await  BrandModel.findByIdAndUpdate(brandid ,{
          $set: {
              brandApproved : true
          }
      });
  
     ;
  
      return form;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  

module.exports = {
    approvebrandModel
}