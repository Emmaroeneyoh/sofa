const { handleError } = require("../utils");
const joi = require("joi");

const customerwaitlistValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return handleError(err)(res);
  }
  return next();
};
const customeradditemwishlistValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    item: joi.object().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return handleError(err)(res);
  }
  return next();
};
const customerremoveitemwishlistValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    itemid: joi.string().required(),
    wishlistid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    return handleError(err)(res);
  }
  return next();
};

module.exports = {
  customeradditemwishlistValidation,
  customerremoveitemwishlistValidation,  customerwaitlistValidation
};
