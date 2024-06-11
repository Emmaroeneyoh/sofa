const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Customerschema = new schema({
  email: {
    type: String,
  },
  accountdeactivated: {
    type:Boolean, default : false
  },
  customerblocked: {
    type: Boolean, default : false
  },
  name: {
    type: String,
    default: "",
  },
  online_status: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,  default :""
  },
  country: {
    type: String,
  },

  default_address: {
    type: String, default :""
  },
  default_card: {
    type: String, default :""
  },
  auth:{
    auth_token:{
        type:String , default : ''
    },
    auth_code:{
        type:String , default : ''
    },
},
  wishlist: {
    default: [],
    type: [
      {
        productid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
      },
    ],
  },
  auth:{
    auth_token:{
        type:String , default : ''
    },
    auth_code:{
        type:String , default : ''
    },
},

  followed_store: {
    default: [],
    type: [
      {
        storeid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "seller",
        },
      },
    ],
  },
  auth:{
    auth_token:{
        type:String , default : ''
    },
    auth_code:{
        type:String , default : ''
    },
    auth_verified:{
        type:Boolean , default : false
    },
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const CustomerModel = mongoose.model("customer", Customerschema);
module.exports = {
  CustomerModel,
};
