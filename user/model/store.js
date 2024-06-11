const { SellerCategory } = require("../../seller/core/db/category");
const { ProductModel } = require("../../seller/core/db/product");
const { SellerModel } = require("../../seller/core/db/seller");
const { SellersubCategory } = require("../../seller/core/db/subcategory");
const { sellervisitor } = require("../../seller/core/db/visitor");
const { CustomerModel } = require("../core/db/customer");



const customervisitstoreModel = async (data, res) => {
    try {
        const { sellerid, ipaddress } = data;
        
   
      const form = await new sellervisitor({
        sellerid , ipaddress
      });
  
        const useraddress = await form.save();
        
        //update the seller 
       await SellerModel.findByIdAndUpdate(sellerid, {
            $inc: {
                totalvisitors : 1
            },
          });
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
}
const customerretrievestoreModel = async (data, res) => {
    try {
        const { sellerid, customerid} = data;
         console.log('sellerid', sellerid)
        //update the seller 
     const store =   await SellerModel.findById(sellerid);
        const storecategories = await SellerCategory.find({ sellerid });
      const sellerproduct = await ProductModel.find({ sellerid });
      
      let userfollow  = false
      if (customerid) {
        const user = await CustomerModel.findById(customerid);
        console.log('user', user)
        const follower = user.followed_store;
        const followerIds = follower.map(x => x.storeid);
        userfollow = followerIds.some(id => id.equals(sellerid));
      }
        const storedata = {
            store , storecategories , sellerproduct , userfollow
        }
        
      return storedata
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
}
const customerretrievesubcateoryModel = async (data, res) => {
    try {
        const { sellerid , categoryid} = data;
        
        //update the seller 
     const store =   await SellerModel.findById(sellerid);
      const storesubcategories = await SellersubCategory.find({ category: categoryid });
      const products = await ProductModel.find({sellerid})
        const storedata = {
            store , storesubcategories , products
        }
        
      return storedata
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
}


module.exports = {
    customervisitstoreModel ,customerretrievestoreModel , customerretrievesubcateoryModel
}