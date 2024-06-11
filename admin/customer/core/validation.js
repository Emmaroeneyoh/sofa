const joi = require("joi");
const { handleError } = require("../../core/utils");

const admincustomerticketValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
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
const admincustomerorderValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    orderid: joi.string().required(),
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

const adminqueryorderValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    orderid: joi.string().required(),
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
const adminretrievecustomerorderValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
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
const adminsendnewletterValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    emails: joi.array().required(),
    subject: joi.string().required(),
    content: joi.string().required(),
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

const admincreateticketValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    customerid: joi.string().required(),
    request: joi.string().required(),
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
const adminretrieveticketValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
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

const adminretrievechatValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required(),
    customerid: joi.string().required(),
    ticketid: joi.string().required(),
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
const adminchangecustomerticketstatusValidation = (req, res, next) => {
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
    return handleError(err)(res);
  }
  return next();
};

module.exports = {
  admincustomerorderValidation,
  adminretrievecustomerorderValidation,
  adminsendnewletterValidation,
  adminqueryorderValidation,
  adminretrieveticketValidation,
  adminretrievechatValidation,
  admincreateticketValidation,
  adminchangecustomerticketstatusValidation, admincustomerticketValidation
};
