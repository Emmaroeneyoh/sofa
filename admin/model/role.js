const { AdminModel } = require("../core/db/admin");
const { adminroleModel } = require("../core/db/role");


const admincreateroleModel = async (data, res) => {
    try {
      const {
        adminrole , permissions
       
      } = data;
      const form = await new adminroleModel ({
          role: adminrole , permissions
      });
     
        const userDetails = await form.save()
    
  
      return userDetails;
    } catch (error) {
      console.log('error' , error);
      return error.message;
     
    }
};
  

const adminupdateroleModel = async (data, res) => {
    try {
      const { roleid , adminrole , permissions} = data;
  
      const form = await adminroleModel.findByIdAndUpdate(roleid, {
        $set: {
         role : adminrole , permissions
        },
      });
    //   const updateadminrole = await AdminModel.updateMany({ "roles.roleid": roleid },
    //   { $set: { 'roles.role':adminrole } }, // Update operation
    //   { multi: true },
    //   )

      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
};
  

const admindeleteroleModel = async (data, res) => {
    try {
        const { roleid } = data;
        
        const form = await adminroleModel.findByIdAndDelete(roleid);
        const deleteadminrole = await AdminModel.updateMany({ "roles.roleid": roleid },
        { $pull: { roles: { _id: roleid } } }, // Update operation
        { multi: true },
        )
  
      return form;
    } catch (error) {
      console.log("error", error);
      return error.message;
    }
  };
module.exports = {
    admincreateroleModel , adminupdateroleModel , admindeleteroleModel
}
  