const joi = require('joi')


const customercreateaddressValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    address: joi.string().required(),
    postalcode: joi.string().required(),
    country: joi.string().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    latitiude: joi.string().required(),
    longitude: joi.string().required(),
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
const customerupdateaddressValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    addressid: joi.string().required(),
    address: joi.string().required(),
    postalcode: joi.string().required(),
    country: joi.string().required(),
    state: joi.string().required(),
    city: joi.string().required(),
    latitiude: joi.string().required(),
    longitude: joi.string().required(),
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

const customersetdefaultaddressValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    addressid: joi.string().required(),
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
  customerupdateaddressValidation,
  customercreateaddressValidation, customersetdefaultaddressValidation
};
