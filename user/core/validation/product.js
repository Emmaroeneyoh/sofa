const joi = require("joi");
const { handleError } = require("../utils");

const usersingleproductValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    // userid: joi.string().required(),
    productid: joi.string().required(),
 
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
const usersingleorderValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    userid: joi.string().required(),
    orderid: joi.string().required(),
 
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
const usercreateorderValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    userid: joi.string().required(),
    orderItem: joi.array().required(),
 
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
    usersingleproductValidation , usersingleorderValidation , usercreateorderValidation 
}