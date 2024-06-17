const joi = require("joi");
const { handleError } = require("../utils");

const approveproductValidation = (req, res, next) => {
  const schema = joi.object({
adminid: joi.string().required().length(24),
    productid: joi.string().required(),
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

const retrievesingleproductValidation = (req, res, next) => {
  const schema = joi.object({
adminid: joi.string().required().length(24),
    productid: joi.string().required(),
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
const retrieveallproductValidation = (req, res, next) => {
  const schema = joi.object({
adminid: joi.string().required().length(24),
    page: joi.number().required(),
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

const createProductValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    productname: joi.string().required(),
    category: joi.string().required(),
    productprice: joi.number().required(),
    subcategory: joi.string().required().optional(),
    variants: joi.array().optional(),
    recommended: joi.array().optional(),
    coverimage: joi.string().required(),
    images: joi.array().required(),
    productdescription: joi.string().required(),
    quantity: joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    let errlen = err.split(" ");
    console.log("this is length ", errlen.length);
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
const updateProductValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    productid: joi.string().required(),
    productname: joi.string().required(),
    category: joi.string().required(),
    productprice: joi.number().required(),
    subcategory: joi.string().required().optional(),
    variants: joi.array().optional(),
    recommended: joi.array().optional(),
    coverimage: joi.string().required(),
    images: joi.array().required(),
    productdescription: joi.string().required(),
    quantity: joi.number().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    let errlen = err.split(" ");
    console.log("this is length ", errlen.length);
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
  approveproductValidation,
  retrievesingleproductValidation,
  retrieveallproductValidation,   createProductValidation  , updateProductValidation
};
