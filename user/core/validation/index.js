

const joi = require("joi");
const { handleError } = require("../utils");

const contactusValidation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    email: joi.string().required().email(),
    phone: joi.string().required(),
    name: joi.string().required(),
    companyname: joi.string().required(),
    short_description: joi.string().required(),
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

const contactus2Validation = (req, res, next) => {
  const schema = joi.object({
    // adminId: joi.string().required(),
    email: joi.string().required().email(),
    phone: joi.string().required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    subject: joi.string().required(),  
    message: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
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
    contactusValidation  , contactus2Validation
}