const joi = require("joi");
const { handleError } = require("../utils");

const admincreateroleValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    role: joi.string().required(),
    permissions: joi.array().required(),
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

const adminupdateroleValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    role: joi.string().required(),
    roleid: joi.string().required(),
    permissions: joi.array().required(),
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
const admindeleteroleValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    roleid: joi.string().required(),
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

const adminchangestaffstatusValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    staffid: joi.string().required(),
    status: joi.boolean().required(),
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

const adminaddroleValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    staffid: joi.string().required(),
    role: joi.string().required(),
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

const adminremoveroleValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    staffid: joi.string().required(),
    role: joi.string().required(),
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
const admindeletestaffValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    staffid: joi.string().required(),
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
const adminupdatestaffValidation = (req, res, next) => {
  const schema = joi.object({
    adminid: joi.string().required().length(24),
    staffid: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().required(),
    phone: joi.string().required(),
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
  admincreateroleValidation,
  adminupdateroleValidation,
  admindeleteroleValidation,
  adminchangestaffstatusValidation,
  adminremoveroleValidation,
  adminaddroleValidation,
  adminupdatestaffValidation,
  admindeletestaffValidation,
};
