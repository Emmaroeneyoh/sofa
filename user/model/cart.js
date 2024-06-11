const { cartmodel } = require("../core/db/cart");

const customercreatecartModel = async (data, res) => {
  try {
    const { customerid, sellerid, productid, delivery_fee, price, totalfee , variantid ,  variantpoduct } =
      data;
    const checkcart = await cartmodel.findOne({ customerid, productid })
    if (checkcart) {
      await cartmodel.findOneAndUpdate(
        { customerid , _id : checkcart._id },
        { $inc: { quantity: 1 } }
      );
      const cart = await cartmodel.findById(checkcart._id);
      const price = cart.price;
      const quantity = cart.quantity;
      const newprice = price * quantity;
      await cartmodel.findByIdAndUpdate(checkcart._id, {
        $set: {
          subprice: newprice,
        },
      });
      return 'success'
    }
    const form = await new cartmodel({
      customerid,
      sellerid,
      productid,
      delivery_fee,
      price,
      totalfee,
      subprice: price, variantid ,  variantpoduct
    });

    const useraddress = await form.save();
    return useraddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customeradditemtocartcartModel = async (data, res) => {
  try {
    const { cartid } = data;
    const form = await cartmodel.findByIdAndUpdate(cartid, {
      $inc: {
        quantity: 1,
      },
    });
    const cart = await cartmodel.findById(cartid);
    const price = cart.price;
    const quantity = cart.quantity;
    const newprice = price * quantity;
    await cartmodel.findByIdAndUpdate(cartid, {
      $set: {
        subprice: newprice,
      },
    });
    return "quantity added";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};
const customersubtractitemtocartcartModel = async (data, res) => {
  try {
    const { cartid } = data;
    const form = await cartmodel.findByIdAndUpdate(cartid, {
      $inc: {
        quantity: -1,
      },
    });
    const cart = await cartmodel.findById(cartid);
    const price = cart.price;
    const quantity = cart.quantity;
    const newprice = price * quantity;
    await cartmodel.findByIdAndUpdate(cartid, {
      $set: {
        subprice: newprice,
      },
    });
    return "quantity added";
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

module.exports = {
  customercreatecartModel,
  customersubtractitemtocartcartModel,
  customeradditemtocartcartModel,
};
