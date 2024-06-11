const { customersupportModel } = require("../core/db/support");
const { customerticketModel } = require("../core/db/ticket");

const customercreateticketModel = async (data, res) => {
  try {
    const { request, customerid } = data;
    //generate tracking id

    const form = await new customerticketModel({
      request,
      customerid,
    });

    const useraddress = await form.save();
    return useraddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerretrieveticketModel = async (data, res) => {
  try {
    const { request, customerid } = data;
    //generate tracking id
    const ticket = await customerticketModel
      .find({ customerid })
      .sort({ ticketstatus: -1 })
      .populate(
        { path: "customerid", select: "name photo" } // Populate 'category' with only 'categoryName'
      );
    return ticket;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerretrievechatModel = async (data, res) => {
  try {
    const { customerid, ticketid } = data;
    //generate tracking id
    const ticket = await customersupportModel.find({ ticketid }).populate(
      { path: "ticketid", select: "request" } // Populate 'category' with only 'categoryName'
    );
    return ticket;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerupdateticketstatusModel = async (data, res) => {
  try {
    const { customerid, ticketid, status } = data;
    console.log('plow')
    //generate tracking id
    const ticket = await customerticketModel.findByIdAndUpdate(ticketid, {
      $set: { ticketstatus: status },
    });
    return ticket;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  customercreateticketModel,
  customerretrieveticketModel,
  customerretrievechatModel, customerupdateticketstatusModel
};
