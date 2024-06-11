const { customerordermodel } = require("../../../customer/core/db/order");
const {
  orderactivitymodel,
} = require("../../../customer/core/db/order_activity");
const { dispatchlistmodel } = require("../../../rider/core/db/order");

const axios = require("axios");
const { SellerModel } = require("../../../seller/core/db/seller");
const { CustomerModel } = require("../../../customer/core/db/customer");
const { sellerordermodel } = require("../../../seller/core/db/order");
const adminconfirmcustomerorderModel = async (data, res) => {
  try {
    const { orderid, adminid } = data;
    console.log('wpoeks')
    const order = await customerordermodel.findById(orderid);
    console.log('this is order :' , order)
    const requestData = {
      vehicle_type: order.delivery_vehicle,
      sendername: order.sellername,
      senderphone: order.sellerphone,
      senderaddress: order.selleraddress,
      sendercity: order.sellercity,
      senderlandmark: '',
      senderlat: order.sellercordinate.sellerlatitude,
      senderlong: order.sellercordinate.sellerlongitude,
      // receivername: order.username,
      receivername: 'testi pain',
      receiverphone: order.userphone,
      receiveraddress: order.useraddress,
      receivercity: order.usercity,
      receiverlandmark: '',
      receiverlat: order.usercordinate.userlatitiude,
      receiverlong: order.usercordinate.userlongitude,
      trackingid: order.trackingid,
      userid: order.customerid,
      productname: 'altinsmart product',
      total_fee: order.total_fee,
      payment_method: true,
   
    };
    const apiUrl = "http://localhost:5000/user/altinsmart/add/order";
    const bearerToken = "iamtryingybest";
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json", // Adjust content type based on your API requirements
      },
    });

    if (!response.data.status) {
      return "failed";
    }
    await customerordermodel.findByIdAndUpdate(order._id, {
      $set: {
        order_approved: true,
      },
    });
    console.log("Response:", response.data);
    return " succuess";
  } catch (error) {
    console.log("error", error.response.data);
    return error.message;
  }
};


const blockcustomerModel = async (data, res) => {
  try {
    const {
      customerid
    } = data;

    const form = await CustomerModel.findByIdAndUpdate(customerid , {
        $set: {
           customerblocked:true
       }
    });

    return form
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};
const adminqueryorderstatusModel = async (data, res) => {
  try {
    const {
      orderid , status
    } = data;

    //uodate order status
     await customerordermodel.findByIdAndUpdate(orderid , {
        $set: {
           queryorder : status 
       }
     });
    
    //uodate order status
     await sellerordermodel.findOneAndUpdate({orderid} , {
        $set: {
           queryorder : status 
       }
    });

    return 'success'
  } catch (error) {
    console.log(error);
    return error.message;
    // handleError(error.message)(res)
  }
};
module.exports = {
  adminconfirmcustomerorderModel,  blockcustomerModel , adminqueryorderstatusModel
};
