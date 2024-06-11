const { ProductModel } = require("../../seller/core/db/product");
const { CustomerModel } = require("../core/db/customer");
const { productreviewModel } = require("../core/db/productreview");


const updateproductrating =  async(id) => {
  const allproduct = await productreviewModel.find({ productid: id })
  const allratings = allproduct.map((x) => x.rating)
  const numberArray = allratings.map(Number);
  let sum = 0;

for (let i = 0; i < numberArray.length; i++) {
    sum += numberArray[i];
  }
  const mean = sum / numberArray.length
  const updateproduct = await ProductModel.findByIdAndUpdate(id, {
    $set: {
      rating : mean
    }
  })
  return 'done'
}

const customerproductreviewModel = async (data, res) => {
    try {
      const {
        customerid,
        productid,
        review, sellerid, rating,
      } = data;
      //check if customer as an existing rating and review for this product
      const checkuser = await productreviewModel.findOne({ customerid, productid })
      if (checkuser) {
        await productreviewModel.findOneAndUpdate({ customerid, productid }, {
          $set: {
            review , rating
          }
        })
        //for rating algorithm
        const updaterating = await updateproductrating(productid)
        return 'success'
      }
      const form = await new productreviewModel({
        customerid,
        productid,
        review, sellerid, rating,
      });
     
      const userDetails = await form.save()
      //for rating algorithm
      const updaterating = await updateproductrating(productid)
      return 'success'
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
  };
  
  const customerretrievesingleproductModel = async (data, res) => {
    try {
      const { productid , customerid } = data;
      const review = await productreviewModel.find({ productid }).populate({ path: 'customerid', select: 'image name' })
      const relatedproduct = await ProductModel.find().limit(4)
      const product = await ProductModel.findById(productid).populate({ path: 'sellerid', select: 'name' })
      let userwishlist  = false
      if (customerid) {
        const user = await CustomerModel.findById(customerid);
        const follower = user.wishlist;
        const followerIds = follower.map(x => x.productid);
        userwishlist = followerIds.some(id => id.equals(productid));
      }
      const productdata = { product, review , relatedproduct , userwishlist };

      return productdata;
    } catch (error) {
      console.log(error);
      return error.message;
      // handleError(error.message)(res)
    }
};
module.exports = {
    customerproductreviewModel ,  customerretrievesingleproductModel
}