const joi = require("joi");
const { handleError } = require("../utils");

const createofferValidation = (req, res, next) => {
  const schema = joi.object({
   adminid: joi.string().required().length(24),
    title: joi.string().required(),
    start_date: joi.string().required(),
    end_date: joi.string().required(),
    package: joi.string().optional().allow(""),
    offertype: joi.string().required(),
    banner: joi.string().optional().allow(""),
    product: joi.array().optional().allow(""),
    seller: joi.array().optional().allow(""),
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

const updateofferValidation = (req, res, next) => {
  const schema = joi.object({
   adminid: joi.string().required().length(24),
    title: joi.string().required(),
    start_date: joi.string().required(),
    end_date: joi.string().required(),
    offerid: joi.string().required(),
    banner: joi.string().required(),
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

const deleteretrieveofferValidation = (req, res, next) => {
  const schema = joi.object({
   adminid: joi.string().required().length(24),
    offerid: joi.string().required(),
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
const uodateofferstatusValidation = (req, res, next) => {
  const schema = joi.object({
   adminid: joi.string().required().length(24),
    offerid: joi.string().required(),
    status: joi.boolean().required(),
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
  deleteretrieveofferValidation,
  updateofferValidation,
  createofferValidation,
  uodateofferstatusValidation,
};
