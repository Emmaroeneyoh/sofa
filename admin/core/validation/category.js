const joi = require("joi");
const { handleError } = require("../utils");

const createcategoryValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    category: joi.string().required(),
    categoryurl: joi.string().required(),
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

const updatecategoryValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    category: joi.string().required(),
    categoryid: joi.string().required(),
    categoryurl: joi.string().required(),
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

const retrievedeletecategoryValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
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
const createsubcategoryValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    category: joi.string().required(),
    subcategory: joi.string().required(),
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

const updatesubcategoryValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    category: joi.string().required(),
    categoryid: joi.string().required(),
    categoryurl: joi.string().required(),
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

const retrievedeletesubcategoryValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
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
const retrievecategorysubcategoryValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    category: joi.string().required(),
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
  createcategoryValidation,
  retrievedeletecategoryValidation,
  updatecategoryValidation,
  createsubcategoryValidation,
  retrievecategorysubcategoryValidation,
};
