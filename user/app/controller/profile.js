const bcrypt = require("bcryptjs");
const { UserModel } = require("../../core/db/user");
const { handleError } = require("../../core/utils");
const { userretrieveprofileModel, userUpdatepasswordModel, userupdateprofileModel } = require("../model/profile");



const userretrieveprofileController = async (req, res, next) => {
    try {
        const { userid } = req.body;

      const data = { userid };
      let trainee = await UserModel.findById(userid);
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "login process successful",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  
const userupdatepasswordController  = async (req, res, next) => {
    const { userid, currentpassword, newpassword } = req.body;
    try {
      
      const userDetails = await UserModel.findById(userid);
      if (!userDetails) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "user dont exist on our application",
          data: [],
          error: "user dont exist on our application",
        });
      }
  
      const checkPassword = await bcrypt.compare(
        currentpassword,
        userDetails.password
      );
      if (!checkPassword) {
        return res.status(400).json({
          status_code: 400,
          status: false,
          message: "incorrect password",
          data: [],
          error: "incorrect password",
        });
      }
      const salt = await bcrypt.genSalt();
      const Harshpassword = await bcrypt.hash(newpassword, salt);
      const data = {
        userid,
        Harshpassword,
      };
  
      let trainee = await userUpdatepasswordModel(data, res);
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "login process successful",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  
const userupdateprofileController = async (req, res, next) => {
    const { name, email , userid , address, postalcode , phone} = req.body;
    const useremail = email.toLowerCase();
    try {
        
      const user = await UserModel.findOne({ email: useremail });
      const personid = user._id.toHexString();
        if (user) {
          if (personid !== userid) {
              return res.status(400).json({
                status_code: 400,
                status: false,
                message: "email already existed",
                data: [],
                error: "email already existed",
              });
            }
      }
  
      const data = {
        name, email , userid , address, postalcode , phone
      };
  
      let trainee = await userupdateprofileModel(data, res);
  
      return res.status(200).json({
        status_code: 200,
        status: true,
        message: "login process successful",
        data: trainee,
      });
    } catch (error) {
      console.log(error);
      handleError(error.message)(res);
    }
};
  

module.exports = {
    userretrieveprofileController , userupdateprofileController , userupdatepasswordController
}