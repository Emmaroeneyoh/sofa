const { UserModel } = require("../../core/db/user");
const { create_user_token } = require("../../core/utils");


const userSignupModel = async (data, res) => {
  try {
    const {
      name,
      userEmail,
      Harshpassword, phone
     
    } = data;
    const form = await new UserModel ({
        name,
        email:userEmail,
       password : Harshpassword , phone
       
    });
   
    const userDetails = await form.save()
    const token = create_user_token(userDetails._id);
    const userData = {
      id: userDetails._id,
      email: userDetails.email,
      token, 
    };

    return userData;
  } catch (error) {
    console.log('error' , error);
    return error.message;
   
  }
};



const userLoginModel = async (data,res) => {
  try {
    const { userEmail, } = data
     const userDetails = await UserModel.findOne({ email:userEmail});
     const token = create_user_token(userDetails._id)
     const userData = {
         id: userDetails._id,
         name: userDetails.name,
         email: userDetails.email,
         token,
      }
   
     return userData
  } catch (error) {
      return error.message
  }
     
 }
module.exports = {
    userSignupModel , userLoginModel
}