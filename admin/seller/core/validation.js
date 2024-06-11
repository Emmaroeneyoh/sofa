const joi = require("joi");
const { handleError } = require("../../core/utils");

const approvebrandValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    brandid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};

const adminsellerorderValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    orderid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};
const adminretrievesellerorderValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    sellerid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};

//ticket
const admincreatesellerticketValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    sellerid: joi.string().required(),
    request: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};
const adminretrievesellerticketValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    sellerid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};
const adminretrievesellerchatValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    sellerid: joi.string().required(),
    ticketid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};
const adminchangesellerticketstatusValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    status: joi.boolean().required(),
    ticketid: joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};
const adminretrievesellerticketstatusValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    status: joi.boolean().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    let err = error.details[0].message;
    // let errlen = err.split(' ')
    // console.log('this is length ' , errlen.length)
    handleError(err)(res);
  }
  return next();
};

module.exports = {
  approvebrandValidation,
  adminsellerorderValidation,
  adminretrievesellerorderValidation,
  adminretrievesellerticketValidation,
  adminretrievesellerchatValidation,
  admincreatesellerticketValidation,
  adminchangesellerticketstatusValidation,adminretrievesellerticketstatusValidation
};
