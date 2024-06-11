const { CardModel } = require("../core/db/card");
const { CustomerModel } = require("../core/db/customer");
const { encryptcard } = require("../core/utils");

const customercreatecardModel = async (data, res) => {
  try {
    const { customerid, encyrptnumber, encyrptcvv, card_name, expire_date } =
      data;
    const form = await new CardModel({
      customerid,
      card_cvv: encyrptcvv,
      card_name,
      card_number: encyrptnumber,
      expire_date,
    });

    const useraddress = await form.save();
    //checking if the user has a default address
    const customer = await CustomerModel.findById(customerid);
    const customeraddress = customer.default_card;
    if (!customeraddress) {
      const updateaddress = await CustomerModel.findByIdAndUpdate(customerid, {
        $set: {
          default_card: useraddress._id,
        },
      });
    }
    return useraddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customerupdatecardModel = async (data, res) => {
  try {
    const { encyrptnumber, encyrptcvv, card_name, expire_date, cardid } = data;
    const updateaddress = await CardModel.findByIdAndUpdate(cardid, {
      $set: {
        card_cvv: encyrptcvv,
        card_name,
        card_number: encyrptnumber,
        expire_date,
      },
    });
    return updateaddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customersetdefaultcardModel = async (data, res) => {
  try {
    const { cardid, customerid } = data;
    const updateaddress = await CustomerModel.findByIdAndUpdate(customerid, {
      $set: {
        default_card: cardid,
      },
    });
    return updateaddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerretrievedefaultcardModel = async (data, res) => {
  try {
    const { customerid } = data;
    const customeraddress = await CustomerModel.findById(customerid);
    const defaultaddress = customeraddress.default_card;
    const address = await CardModel.findById(defaultaddress);
    return address;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  customercreatecardModel,
  customerupdatecardModel,
  customersetdefaultcardModel,customerretrievedefaultcardModel
};
