const { CustomerModel } = require("../core/db/customer");

const CustomerUpdateprofileModel = async (data, res) => {
  try {
    const { country, customerEmail, name, phone, customerid } = data;

    const form = await CustomerModel.findByIdAndUpdate(customerid, {
      $set: {
        country,
        email: customerEmail,
        phone,
        name,
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};


const CustomerUpdatepasswordModel = async (data, res) => {
  try {
    const { customerid, Harshpassword } = data;

    const form = await CustomerModel.findByIdAndUpdate(customerid, {
      $set: {
        password: Harshpassword,
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const CustomerupdatephotoModel = async (data, res) => {
  try {
    const { customerid, photo } = data;

    const form = await CustomerModel.findByIdAndUpdate(customerid, {
      $set: {
        photo,
      },
    });

    return form;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  CustomerUpdateprofileModel,
  CustomerUpdatepasswordModel,
  CustomerupdatephotoModel,
};
