const { AdminModel } = require("../core/db/admin");
const { create_admin_token } = require("../core/utils");


const AdminSignupModel = async (data, res) => {
  try {
    const {
      name,
      adminEmail,
      Harshpassword,
      phone, roles
     
    } = data;

    const form = await new AdminModel({
        name,
        email:adminEmail,
       password: Harshpassword,
        phone, roles
    });
    const userDetails = await form.save()
    const token = create_admin_token(userDetails._id);
    const userData = {
      id: userDetails._id,
      email: userDetails.email,
      token,
    };

    return userData;
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};



const AdminLoginModel = async (data,res) => {
  try {
    const { adminEmail, } = data
    const userDetails = await AdminModel.findOne({ email: adminEmail })
     const token = create_admin_token(userDetails._id)
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
    AdminSignupModel , AdminLoginModel
}