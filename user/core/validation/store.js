const { handleError } = require("../utils");
const joi = require("joi");

const customerretrievestoreValidation = (req, res, next) => {
  const schema = joi.object({
    sellerid: joi.string().required(),
    customerid: joi.string().optional().allow(''),
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
const customerretrievestoresubcategoryValidation = (req, res, next) => {
  const schema = joi.object({
    sellerid: joi.string().required(),
    categoryid: joi.string().required(),
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
const customerretrievestoreproductValidation = (req, res, next) => {
  const schema = joi.object({
    sellerid: joi.string().required(),
    subcategoryid: joi.string().required(),
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
  customerretrievestoreValidation,
  customerretrievestoreproductValidation,
  customerretrievestoresubcategoryValidation,
};
