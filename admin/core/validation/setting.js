const joi = require("joi");
const { handleError } = require("../utils");

const updateplatformValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    platformNumber: joi.number().required(),
    apikey: joi.string().required(),
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
const updateplatformstatusValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    platformNumber: joi.number().required(),
    inUse: joi.boolean().required(),
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

const updatesmtpValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    port: joi.number().required(),
    host: joi.string().required(),
    username: joi.string().required(),
    password: joi.string().required(),
    mailfromaddress: joi.string().required(),
    mailfromname: joi.string().required(),
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

const admindeletefileValidation = (req, res, next) => {
  const schema = joi.object({
    fileids: joi.array().required(),
    adminid: joi.string().required().length(24),
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

const adminaddfileValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    filebank: joi.array().required(),
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
const adminupdateinvoiceValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    url: joi.string().required(),
    phone: joi.string().required(),
    email: joi.string().required(),
    address: joi.string().required(),
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
  updateplatformValidation,
  updatesmtpValidation,
  updateplatformstatusValidation,
  admindeletefileValidation,
  adminaddfileValidation, adminupdateinvoiceValidation
};
