

const joi = require('joi');
const { handleError } = require('../utils');


const userupdatepasswordValidation = (req, res, next) => {
    const schema = joi.object({
      userid: joi.string().required(),
      currentpassword: joi.string().required(),
      newpassword: joi.string().required(),
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
  
const userupdateprofileValidation = (req, res, next) => {
    const schema = joi.object({
      userid: joi.string().required(),
      name: joi.string().required(),
      email: joi.string().required(),
      phone: joi.string().required(),
      address: joi.string().required(),
      postalcode: joi.string().required(),
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
    userupdateprofileValidation ,  userupdatepasswordValidation
  }