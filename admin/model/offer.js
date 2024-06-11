const { ProductModel } = require("../../seller/core/db/product");
const { SellerModel } = require("../../seller/core/db/seller");
const { offerModel } = require("../core/db/offer");


const createofferModel = async (data, res) => {
    try {
      const {
        start_date, end_date, package, offertype , tilename  , banner , product , seller
      } = data;
      
      console.log('product'  ,product.length , 'seller' , seller)
      let itemkey 
      let itemvalue
      if (product.length > 0) {
        itemkey  = 'product'
        itemvalue = product
      } else if(seller.length > 0) {
        itemkey  = 'seller'
        itemvalue  = seller
      }
      console.log('item key' , itemkey , 'item value', itemvalue)
      if (offertype == 'product') {
        const products = await ProductModel.find({ 'plan.plan_id': package }).select('_id')
        
      const form = await new offerModel({
        start_date, end_date, package, offertype , title : tilename , product : products , banner
    });
        const userDetails = await form.save()
        

      } else if (offertype == 'seller') {
        const seller = await SellerModel.find({ 'plan.plan_id': package }).select('_id')
        
        const form = await new offerModel({
          start_date, end_date, package, offertype , title : tilename ,  seller , banner
      });
          const userDetails = await form.save()
      } else if (package == '') {
        console.log('product', product.length, 'seller', seller)
        const formObject = {
          start_date,
          end_date,
          package,
          offertype,
          title: tilename,
          banner,
      };
      
      // Add itemkey and itemvalue dynamically if they are defined
      if (itemkey && itemvalue) {
          formObject[itemkey] = itemvalue;
      }
      
      const form = await new offerModel(formObject);
      const userDetails = await form.save();
      }
  
      return 'success';
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
  }

const updateofferModel = async (data, res) => {
    try {
      const {
       end_date, package,   offerid , title ,  offertype , banner ,  start_date
      } = data;
      console.log('ofeer' , offerid)
      const form = await offerModel.findByIdAndUpdate( offerid, {
        $set: {
          end_date,title , banner ,  start_date
        },
      });
  
      return  'success';
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
}
const updateofferstatusModel = async (data, res) => {
    try {
      const {
       status , offerid
      } = data;
      console.log('ofeer' , offerid)
      const form = await offerModel.findByIdAndUpdate( offerid, {
        $set: {
          offerInuse : status
        },
      });
  
      return  'success';
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
}
  
module.exports = {
  updateofferModel , createofferModel ,  updateofferstatusModel
}