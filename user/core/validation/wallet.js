const joi = require("joi");

const customerfundwalletvalidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    walletid: joi.string().required(),
    trx_type: joi.string().required(),
    amount: joi.number().required(),
    status: joi.boolean().required(),
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

const customermakepaymenthistoryvalidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    email: joi.string().required(),
    usertype: joi.string().required(),
    amount: joi.number().required(),
    cardpayment: joi.boolean().required(),
    platformNumber : joi.number().required(),
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
const customerfundwallethistoryvalidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    walletid: joi.string().required(),
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
  customerfundwallethistoryvalidation,
  customerfundwalletvalidation,  customermakepaymenthistoryvalidation
};
