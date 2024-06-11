const { AdminModel } = require("../core/db/admin");
const mongoose = require("mongoose");

const adminchangestaffstatusModel = async (data, res) => {
  try {
    const { staffid, adminid, status } = data;
    //generate tracking id
    const ticket = await AdminModel.findByIdAndUpdate(staffid, {
      $set: {
        blockadmin: status,
      },
    });
    return ticket;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const adminaddroleModel = async (data, res) => {
  try {
    let { staffid, adminid, role } = data;

    const ticket = await AdminModel.findByIdAndUpdate(staffid, {
      $push: {
        roles: role,
      },
    });
    return "success";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const adminremoveroleModel = async (data, res) => {
  try {
    const { staffid, adminid, role } = data;
    //generate tracking id
    const objectId = new mongoose.Types.ObjectId(role);

    const formattedObjectId = `ObjectId("${objectId.toHexString()}")`;
    const ticket = await AdminModel.findByIdAndUpdate(staffid, {
      $pull: {
        roles: objectId,
      },
    });
    return ticket;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const adminupdatestaffModel = async (data, res) => {
  try {
    const { staffid, adminid, name, email, phone } = data;
    //generate tracking id
    const ticket = await AdminModel.findByIdAndUpdate(staffid, {
      $set: {
        adminid,
        name,
        email,
        phone,
      },
    });
    return ticket;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  adminchangestaffstatusModel,
  adminaddroleModel,
  adminremoveroleModel,
  adminupdatestaffModel,
};
