const { productquerymodel } = require("../core/db/product.query");
const { handleError } = require("../core/utils");
const { customercreateproductqueryModel } = require("../model/product.query");




const CustomercreateproductqueryController = async (req, res, next) => {
    const { customerid, sellerid , productid , query } = req.body;
    try {
      const data = {
        customerid, sellerid , productid , query
      };
      let comment = await customercreateproductqueryModel(data, res);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully retrieved",
        data: comment,
      });
    } catch (error) {
      console.log(error);
      return handleError(error.message)(res);
    }
  };
const CustomerretrieveallproductqueryController = async (req, res, next) => {
    const { customerid} = req.body;
    try {
     
      let comment = await productquerymodel.find({customerid});
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully retrieved",
        data: comment,
      });
    } catch (error) {
      console.log(error);
    return  handleError(error.message)(res);
    }
  };
  
  
module.exports = {
    CustomerretrieveallproductqueryController ,  CustomercreateproductqueryController
  }