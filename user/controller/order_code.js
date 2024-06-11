const { ordercodemodel } = require("../core/db/order_code");



const CustomerallordercodeController = async (req, res, next) => {
    const { customerid } = req.body;
    try {
      const data = {
        customerid
      };
      let comment = await ordercodemodel.find({customerid})
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully retrieved",
        data: comment,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  
const CustomersingleordercodeController = async (req, res, next) => {
    const { orderid } = req.body;
    try {
      const data = {
        orderid
      };
      let comment = await ordercodemodel.find({orderid})
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "customer successfully retrieved",
        data: comment,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
  };
  

module.exports = {
    CustomersingleordercodeController ,  CustomerallordercodeController
  }