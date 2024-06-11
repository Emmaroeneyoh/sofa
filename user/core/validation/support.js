
const { handleError } = require("../utils");
const joi = require("joi");

const customercreateticketValidation = (req, res, next) => {
  const schema = joi.object({
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
const customerretrieveticketValidation = (req, res, next) => {
  const schema = joi.object({
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


module.exports = {
    customercreateticketValidation , customerretrieveticketValidation
}