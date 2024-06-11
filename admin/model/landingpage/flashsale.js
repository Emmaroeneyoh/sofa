const { ProductModel } = require("../../../seller/core/db/product");
const { flashsalemodel } = require("../../core/db/landingpage/flashsale");



const adminaddflashsaleModel = async (data, res) => {
    try {
      const {
        productid
      } = data;
  
      const form = await new flashsalemodel({
          productid
      });
      const userDetails = await form.save()
     ;
  
      return userDetails;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
  
const adminretrieveproductforflashsaleModel = async (data, res) => {
    try {
      const products = await ProductModel.find({ "plan.plan_id": {  $ne: "" } });
     console.log('poridu' , products)
      const productsid = products.map((x) => x._id)

   
      const flashsaleproduct = await flashsalemodel.find().select('productid')
      const flashsaleproductid = flashsaleproduct.map((x) => x.productid)
      console.log('porudts id', flashsaleproductid)
      const selectid = productsid.filter(x => !flashsaleproductid.includes(x));
      console.log('seloe', flashsaleproductid, selectid)
      const flashsaleproducts = await flashsalemodel.find({ productid: { $in:selectid } })
      return  flashsaleproducts
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  };
  
module.exports = {
    adminaddflashsaleModel , adminretrieveproductforflashsaleModel
  }