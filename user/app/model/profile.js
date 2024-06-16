const { UserModel } = require("../../core/db/user");

const userretrieveprofileModel = async (data, res) => {
    try {
        const { userid } = data;
        const user = await UserModel.findById(userid);
        const name = user.name 
        const email = user.email
        const info = { name , email}
      return info;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};


const userUpdatepasswordModel = async (data, res) => {
    try {
      const { userid, Harshpassword } = data;
  
      const form = await UserModel.findByIdAndUpdate(userid, {
        $set: {
          password: Harshpassword,
        },
      });
  
      return 'password updated';
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};
  
const userupdateprofileModel = async (data, res) => {
    try {
      const {
        name, email , userid , address, postalcode , phone
      } = data;
      const form = await UserModel.findByIdAndUpdate(userid, {
        $set: {
            name, email , address, postalcode , phone
        },
      });
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
  };
module.exports = {
    userretrieveprofileModel  , userUpdatepasswordModel  , userupdateprofileModel
}