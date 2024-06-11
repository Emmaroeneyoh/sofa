const joi = require("joi");
const { handleError } = require("../utils");

const retrieverequestValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    requestid: joi.string().required(),
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
const approvecustomerrequestValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    requestid: joi.string().required(),
    customerid: joi.string().required(),
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
const approvesellerrequestValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    requestid: joi.string().required(),
    sellerid: joi.string().required(),
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
  approvesellerrequestValidation,
  approvecustomerrequestValidation,
  retrieverequestValidation,
};
