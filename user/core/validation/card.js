const joi = require("joi");

const customercreatecardValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    expire_date: joi.string().required(),
    card_number: joi.string().required(),
    card_cvv: joi.string().required(),
    card_name: joi.string().required(),
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

const customerupdatecardValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    cardid: joi.string().required(),
    expire_date: joi.string().required(),
    card_number: joi.string().required(),
    card_cvv: joi.string().required(),
    card_name: joi.string().required(),
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
const customerretrievedeletecardValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    cardid: joi.string().required(),
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
  customercreatecardValidation,
  customerupdatecardValidation,
  customerretrievedeletecardValidation,
};
