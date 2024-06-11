const { BrandModel } = require("../../admin/core/db/brand");
const { CategoryModel } = require("../../admin/core/db/category");
const { packageModel } = require("../../admin/core/db/package");
const { sellerordermodel } = require("../../seller/core/db/order");
const { seller_ordercodemodel } = require("../../seller/core/db/order_code");
const { ProductModel } = require("../../seller/core/db/product");
const { SellerModel } = require("../../seller/core/db/seller");
const { AddressModel } = require("../core/db/address");
const { CustomerModel } = require("../core/db/customer");
const { customerordermodel } = require("../core/db/order");
const { orderactivitymodel } = require("../core/db/order_activity");
const { ordercodemodel } = require("../core/db/order_code");
const { reorderhistorymodel } = require("../core/db/reorderhistory");
const { viewhistorymodel } = require("../core/db/viewhistory");
const { WalletModel } = require("../core/db/wallet");
const { wallethistoryModel } = require("../core/db/wallethistory");
const { generateordercode } = require("../core/utils");

const customeraddorderModel = async (data, res) => {
  try {
    const { customerid, cart, use_wallet, price, shippingaddressid } = data;

    //looping through customer cart
    await cart.map(async (x) => {
      const track = await generateordercode();
      //find seller details
      const sellerid = x.sellerid;
      const seller = await SellerModel.findById(sellerid);
      const sellername = seller.name;
      const sellerphone = seller.phone;
      const selleraddress = seller.store_address.address;
      const sellerlatitude = seller.store_address.latitiude;
      const sellerlongitude = seller.store_address.longitude;
      const sellercity = seller.store_address.city;

      //find user details
      const customer = await CustomerModel.findById(customerid);
      const username = customer.name;
      const userphone = customer.phone;
      const location = await AddressModel.findById(shippingaddressid);
      const useraddress = location.address;
      const usercity = location.city;
      const userlongitude = location.cordinate.longitude;
      const userlatitiude = location.cordinate.latitiude;
      const form = await new customerordermodel({
        customerid,
        delivery_fee: x.delivery_fee,
        trackingid: track,
        sellercordinate: { sellerlatitude, sellerlongitude },
        sellername,
        sellerphone,
        selleraddress,
        sellercity,
        price: x.price,
        subprice: x.subprice,
        quantity: x.quantity,
        productname: x.productname,
        useraddress,
        usercity,
        username,
        userphone,
        usercordinate: { userlongitude, userlatitiude },
        total_fee: x.totalfee,

        ubprice: x.subprice,
        sellerid: x.sellerid,
        phone: x.phone,
        productid: x.productid,
        delivery_vehicle: x.delivery_vehicle,
        variantpoduct: x.variantpoduct,
        variantid: x.variantid, image :x.image
      });

      const order = await form.save();
      const id = order._id;

      //uodate brand and category
      const product = ProductModel.findById(x.productid);

      await CategoryModel.findByIdAndUpdate(product.category, {
        $inc: { amount_purchased: x.subprice },
      });
      //loop through the sellerr
      const productid = x.productid;
      const quantity = x.quantity;
      const price = x.price;
      const variantpoduct = x.variantpoduct;
      const variantid = x.variantid;
      //get the commission of the customer then calculate the amount
      let commission = 10;

      // const planid = seller.plan.plan_id;
      // if (seller.plan.plan_number == 0) {
      //   commission = 10;
      // } else {
      //   const plan = await packageModel.findById(planid);
      //   commission = plan.commission;
      // }
      const commissionamount = (price * commission) / 100;
      const sellerorder = await new sellerordermodel({
        commission_percentage: commission,
        commission_amount: commissionamount,
        sellerid: x.sellerid,
        orderid: id,
      });

      const sellerordernew = await sellerorder.save();

      //update the stock of the product
      if (variantpoduct) {
        const updatedProduct = await ProductModel.updateOne(
          { _id: productid, "variants._id": variantid },
          {
            $set: {
              "variants.$.quantity": quantity,
            },
            $inc: {
              productsold : quantity
            }
          }
        );
      } else {
        await ProductModel.findByIdAndUpdate(productid, {
          $inc: { quantity: -quantity , productsold : quantity },
        });
      }

      //add reorder history
      await addreorderhistory(productid, customerid);
    });
    //if the user is using wallet , we debit the user here
    if (use_wallet) {
      const wallet = await WalletModel.findOne({ customerid });
      const walletid = wallet._id;
      await WalletModel.findByIdAndUpdate(walletid, {
        $inc: { balance: -price },
      });

      //also update the wallet trans history
      //add to wallet history
      const wallethistory = await new wallethistoryModel({
        customerid,
        walletid,
        status: true,
        amount: price,
        trx_type: "debit",
      });
      await wallethistory.save();
    }

    return "order";
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

const customerretrieveallorderModel = async (data, res) => {
  try {
    const { customerid } = data;
    const order = await customerordermodel.find({ customerid });

    return order;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerretrievesingleorderModel = async (data, res) => {
  try {
    const { orderid } = data;

    const order = await customerordermodel.findById(orderid);
    return order;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerconfirmorderModel = async (data, res) => {
  try {
    const { orderid } = data;
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const updateaddress = await customerordermodel.findByIdAndUpdate(orderid, {
      $set: {
        delivery: {
          confirm_delivery: true,
          delivery_time: timestamp,
        },
      },
    });
    return updateaddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const customerchangeorderstatusdashxModel = async (data, res) => {
  try {
    const { trackingid, status } = data;

    const updateaddress = await customerordermodel.findOneAndUpdate(
      { trackingid },
      {
        $set: {
          order_status: status,
        },
      }
    );
    //update status list
    const currentDate = new Date();
    await customerordermodel.findOneAndUpdate(
      { trackingid },
      {
        $push: {
          statuslist: { orderstatus: status, orderdate: currentDate },
        },
      }
    );
    return updateaddress;
  } catch (error) {
    console.log("error", error);
    return error.message;
  }
};

const addreorderhistory = async (productid, customerid) => {
  const findproduct = await reorderhistorymodel.findOne({
    customerid,
    productid,
  });
  if (findproduct) {
    return "already exist";
  }
  const form = await new reorderhistorymodel({
    customerid,
    productid,
  });

  const useraddress = await form.save();
  return "success";
};

const customerretrieveactiveordermodel = async (data, res) => {
  const { customerid } = data;
  
  try {
    console.log('work')
    return res.status(200).json({
      status_code: 200,
      status: true,
      message: "done",
    });
  } catch (error) {
    console.log('error', error);
    return handleError(error.message)(res)
  }
};

module.exports = {
  customeraddorderModel,
  customerretrieveallorderModel,
  customerretrievesingleorderModel,
  customerconfirmorderModel,
  customerchangeorderstatusdashxModel,  customerretrieveactiveordermodel
};
