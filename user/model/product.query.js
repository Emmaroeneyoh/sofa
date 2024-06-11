const { productquerymodel } = require("../core/db/product.query");



const customercreateproductqueryModel = async (data, res) => {
    try {
      const {   customerid, sellerid , productid , query } = data;
      const form = await new productquerymodel({
        customerid, sellerid , productid , query
      });
  
      const useraddress = await form.save();
      return useraddress;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
}

module.exports = {
    customercreateproductqueryModel
}