const joi = require("joi");
const { handleError } = require("../utils");

const adminaddblogValidation = (req, res, next) => {
  const schema = joi.object({
     adminid: joi.string().required().length(24),
    content: joi.string().required(),
    title: joi.string().required(),
    media: joi.array().required(),
    productad: joi.string().optional().allow("")
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

const adminupdateblogValidation = (req, res, next) => {
  const schema = joi.object({
     adminid: joi.string().required().length(24),
    content: joi.string().required(),
    title: joi.string().required(),
    media: joi.array().required(),
    productad: joi.string().optional().allow(""),
    blogid: joi.string().required(),
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

const adminupdateblogstatusValidation = (req, res, next) => {
  const schema = joi.object({
     adminid: joi.string().required().length(24),
    status: joi.boolean().required(),
    blogid: joi.string().required(),
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

const adminretrieveblogValidation = (req, res, next) => {
  const schema = joi.object({
     adminid: joi.string().required().length(24),
    start_date: joi.string().optional().allow(""),
    stop_date: joi.string().optional().allow(""),
    blogid: joi.string().optional().allow(""),
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
const adminretrievedeleteValidation = (req, res, next) => {
  const schema = joi.object({
     adminid: joi.string().required().length(24),
    blogid: joi.string().required(),
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
  adminaddblogValidation,
  adminupdateblogValidation,
  adminupdateblogstatusValidation,
  adminretrieveblogValidation,
  adminretrievedeleteValidation,
};
