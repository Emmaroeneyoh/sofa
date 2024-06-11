const jwt = require('jsonwebtoken');
const { customerjwt } = require('../../helper/utils');
const { CustomerModel } = require('./db/customer');


const customer_check_token = async (req, res, next) => {
  let customer = req.body.customerid
  const checkuser = await CustomerModel.findById(customer)
  if (!checkuser) {
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: "customer does not exist",
  
      error: "customer does not exist",
    });
  }
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
          token = req.headers.authorization.split(' ')[1] // gotten the token, now we will decode it

          const decoded = jwt.verify(token, customerjwt)
        const user = decoded.user
        if (customer != user) {
          return res.status(400).json({
            status_code: 400,
            status: false,
            message: "mismatch token",
        
            error: "mismatch token",
          });
         }

       next()
      } catch (error) {
        console.log(error)
          return res.status(400).json({
            status_code: 400,
            status: false,
            message: "invalid token",
        
            error: "invalid token",
          });
      }
    }
    if (!token) {
        return res.status(400).json({
            status_code: 400,
            status: false,
            message: "token dont exist",
        
            error: "token dont exist",
          });
    }
}



module.exports = {
    customer_check_token 
}