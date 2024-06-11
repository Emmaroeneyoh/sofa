const joi = require("joi");
const { handleError } = require("../utils");

const customerupdateprofileValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    country: joi.string().required(),
    email: joi.string().required(),
    name: joi.string().required(),
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
const customerupdatepasswordValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    newpassword: joi.string().required(),
    currentpassword: joi.string().required(),
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
const customerretrieveprofileValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
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
const customerupdatephotoValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    photo: joi.string().required(),
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
const customeremailsubscriptionValidation = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().required(),
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
const customerdeleteaccoutnValidation = (req, res, next) => {
  const schema = joi.object({
    reason: joi.string().required(),
    email: joi.string().required(),
    name: joi.string().required(),
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
  customerupdatepasswordValidation,
  customerupdateprofileValidation,
  customerretrieveprofileValidation,
  customeremailsubscriptionValidation,
  customerupdatephotoValidation, customerdeleteaccoutnValidation
};
