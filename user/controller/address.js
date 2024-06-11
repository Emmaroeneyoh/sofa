const { AddressModel } = require("../core/db/address");
const { handleError } = require("../core/utils");
const {
  customercreateaddressModel,
  customerupdateaddressModel,
  customersetdefaultaddressModel,
  customerretrievedefaultaddressModel,
} = require("../model/address");

const CustomercreateaddressController = async (req, res, next) => {
  const {
    customerid,
    address,
    postalcode,
    country,
    state,
    city,
    latitiude,
    longitude,
  } = req.body;
  try {
    const data = {
      customerid,
      address,
      postalcode,
      country,
      state,
      city,
      latitiude,
      longitude,
    };
    let comment = await customercreateaddressModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerupdateaddressController = async (req, res, next) => {
  const { customerid,
    address,
    postalcode,
    country,
    state,
    city,
    latitiude,
    longitude,  addressid} = req.body;
  try {
    const data = {
      customerid,
      addressid,
      address,
      postalcode,
      country,
      state,
      city,
      latitiude,
      longitude,
    };
    let comment = await customerupdateaddressModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomersetdefaultController = async (req, res, next) => {
  const { addressid, customerid } = req.body;
  try {
    const data = {
      addressid,
      customerid,
    };
    let comment = await customersetdefaultaddressModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: comment,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

const CustomerretrievesingleaddressController = async (req, res, next) => {
  const { addressid } = req.body;
  try {
    let address = await AddressModel.findById(addressid);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: address,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerretrievedefaultaddressController = async (req, res, next) => {
  const { customerid } = req.body;
  try {
    const data = {
      customerid,
    };
    let address = await customerretrievedefaultaddressModel(data, res);
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: address,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerretrievealladdressController = async (req, res, next) => {
  try {
    const { customerid } = req.body;
    let address = await AddressModel.find({ customerid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: address,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};
const CustomerdeleteaddressController = async (req, res, next) => {
  try {
    const { customerid, addressid } = req.body;
    let address = await AddressModel.find({ customerid });
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "customer successfully retrieved",
      data: address,
    });
  } catch (error) {
    console.log(error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  CustomercreateaddressController,
  CustomerupdateaddressController,
  CustomersetdefaultController,
  CustomerretrievesingleaddressController,
  CustomerretrievealladdressController,
  CustomerretrievedefaultaddressController,
};
