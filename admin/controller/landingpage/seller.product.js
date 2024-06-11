const { ProductModel } = require("../../../seller/core/db/product");
const { SellerModel } = require("../../../seller/core/db/seller");



const adminretrievequalifiedsellerController = async (req, res, next) => {
    try {
      const brand = await SellerModel.find({ 'plan.plan_id': { $ne: '' } }).sort({'plan.plan_number' : 1})
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: brand,
      });
    } catch (error) {
      console.log(error);
     return handleError(error.message)(res);
    }
};
  

const adminretrievequalifiedproductController = async (req, res, next) => {
    try {
      const brand = await ProductModel.find({ 'plan.plan_id': { $ne: '' } }).sort({'plan.plan_number' : 1})
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "signup process successful",
        data: brand,
      });
    } catch (error) {
      console.log(error);
     return handleError(error.message)(res);
    }
};
  
module.exports = {
    adminretrievequalifiedproductController  , adminretrievequalifiedsellerController
}