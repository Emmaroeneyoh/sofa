const { RiderModel } = require("../../rider/core/db/rider");
const { AddressModel } = require("../core/db/address");
const { CustomerModel } = require("../core/db/customer");

const customercreateaddressModel = async (data, res) => {
  try {
    const {
      customerid,
      address,
      postalcode,
      country,
      state,
      city,
      latitiude,
      longitude,
    } = data;
    const form = await new AddressModel({
      customerid,
      address,
      postalcode,
      country,
      state,
      city, cordinate : { latitiude,
        longitude,}
    });

    const useraddress = await form.save();
    //checking if the user has a default address
    const customer = await CustomerModel.findById(customerid);
    const customeraddress = customer.default_address;
    if (!customeraddress) {
      const updateaddress = await CustomerModel.findByIdAndUpdate(customerid, {
        $set: {
          default_address: useraddress._id,
        },
      });
      //update address to default
       await AddressModel.findByIdAndUpdate(useraddress._id, {
        $set: {
          defaultaddress: true
        },
      });
    }

    return useraddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerupdateaddressModel = async (data, res) => {
  try {
    const {  customerid,
      address,
      addressid,
      postalcode,
      country,
      state,
      city,
      latitiude,
      longitude, } = data;
    const updateaddress = await AddressModel.findByIdAndUpdate(addressid, {
      $set: {
      address,
      postalcode,
      country,
      state,
      city,
      latitiude,
      longitude,
      },
    });
    return updateaddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customersetdefaultaddressModel = async (data, res) => {
  try {
    const { addressid, customerid } = data;
    const customer = await CustomerModel.findById(customerid)
    const defaultaddress = customer.default_address
    //update the default address 
    await AddressModel.findByIdAndUpdate(defaultaddress, {
      $set: {
        defaultaddress: false,
      },
   });
    //update the new address
    await AddressModel.findByIdAndUpdate(addressid, {
      $set: {
        defaultaddress: true,
      },
   });
    const updateaddress = await CustomerModel.findByIdAndUpdate(customerid, {
      $set: {
        default_address: addressid,
      },
    });
    return updateaddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerretrievedefaultaddressModel = async (data, res) => {
  try {
    const { customerid } = data;
    const customeraddress = await CustomerModel.findById(customerid);
    const defaultaddress = customeraddress.default_address;
    const address = await AddressModel.findById(defaultaddress);
    return address;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  customercreateaddressModel,
  customerupdateaddressModel,
  customersetdefaultaddressModel,
  customerretrievedefaultaddressModel,
};
