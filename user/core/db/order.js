const mongoose = require('mongoose')
const schema = mongoose.Schema


const order_schema = new schema({
    image: {
        type:  String,
    },
    queryorder: {
        type:Boolean , default : false
    },
    variantid: {
        type:  String,
        default:''
    },
    variantpoduct: {
        type:  Boolean,
        default:false
    },
 
    quantity: {
            type:Number,  
    },
    price: {
            type:Number,  
    },
    subprice: {
            type:Number,  
    },

    trackingid: {
            type:String,  
    },
    productname: {
        type:String,  
},
    selleraddress: {
            type:String,  
    },
    sellername: {
            type:String,  
    },
    sellercordinate: {
        sellerlatitude: {
            type:String
    },
        sellerlongitude: {
            type:String
    },
},
   
    sellercity: {
            type:String,  
    },
    sellerphone: {
            type:String,  
    },
      
    useraddress: {
            type:String,  
    },
    username: {
            type:String,  
    },
    usercordinate: {
        userlatitiude: {
            type:String
    },
        userlongitude: {
            type:String
    },
},
   
    usercity: {
            type:String,  
    },
    userphone: {
            type:String,  
    },
      
        total_fee: {
            type:Number,  
        },
       
        sellerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'seller'
        },
        productid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'product'
        },
        delivery_fee: {
            type:Number,  
    },
        //be used to track the product
        order_status: {
            type:String,   default :"pending"
    },
        
        delivery_vehicle: {
            type:String,  
    },
        order_approved: {
            type:   Boolean, default : false 
    },
        dashxorder: {
            type:   Boolean, default : false 
    },
        ordercancel: {
            type:   Boolean, default : false 
    },
    statuslist: {
        type : Array , default : [{}]
    },
        customerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'customer'
        },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const customerordermodel = mongoose.model('customer_order', order_schema )
module.exports = {
    customerordermodel
}