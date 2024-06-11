const joi = require("joi");

const customercreatecartValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    price: joi.number().required(),
    delivery_fee: joi.number().required(),
    totalfee: joi.number().required(),
    productid: joi.string().required(),
    sellerid: joi.string().required(),
    variantid: joi.string().required(),
    variantpoduct: joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: err,
      data: [],
      error: err,
    });
  }
  return next();
};

const customerdeletecartValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    cartid: joi.string().required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return res.status(400).json({
      status_code: 400,
      status: false,
      message: err,
      data: [],
      error: err,
    });
  }
  return next();
};



module.exports = {
    customercreatecartValidation,
    customerdeletecartValidation
};
