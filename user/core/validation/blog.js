const joi = require("joi");
const { handleError } = require("../utils");

const customerretrieveallblogValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().optional().allow(""),
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
const customerretrievesellerblogValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().optional().allow(""),
    sellerid: joi.string().required(),
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
const customerretrievesellernameblogValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().optional().allow(""),
    sellername: joi.string().required(),
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
const customeraddcommentValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    comment: joi.string().required(),
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

const customerretrievesinglecommentValidation = (req, res, next) => {
  const schema = joi.object({
    commentid: joi.string().required(),
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
const customersinglecommentValidation = (req, res, next) => {
  const schema = joi.object({
    commentid: joi.string().required(),
    customerid: joi.string().optional().allow(""),
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
const customersingleblogValidation = (req, res, next) => {
  const schema = joi.object({
    blogid: joi.string().required(),
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
const customerdeletecommentValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    blogid: joi.string().required(),
    commentid: joi.string().required(),
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
const customerretrievesingleblogValidation = (req, res, next) => {
  const schema = joi.object({
    blogid: joi.string().required(),
    customerid: joi.string().optional().allow(""),
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

const customeraddreplyValidation = (req, res, next) => {
  const schema = joi.object({
    blogid: joi.string().required(),
    customerid: joi.string().required(),
    commentid: joi.string().required(),
    reply: joi.string().required(),
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
const customerreactreplyValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    replyid: joi.string().required(),
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

const customerdeletereplyValidation = (req, res, next) => {
  const schema = joi.object({
    customerid: joi.string().required(),
    replyid: joi.string().required(),
    blogid: joi.string().required(),
    commentid: joi.string().required(),
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
  customeraddcommentValidation,
  customerretrievesingleblogValidation,
  customerdeletecommentValidation,
  customersinglecommentValidation,
  customeraddreplyValidation,
  customerreactreplyValidation,
  customersinglecommentValidation,
  customerdeletereplyValidation,
  customerretrieveallblogValidation,
  customerretrievesellerblogValidation, customerretrievesellernameblogValidation
};
