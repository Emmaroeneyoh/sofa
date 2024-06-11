const mongoose = require('mongoose')
const schema = mongoose.Schema

const order_schema = new schema({
     
            price: {
                type:Number,  
            },
            subprice: {
                type:Number,  
            },
            quantity: {
                type:Number, default : 1  
            },
            totalfee: {
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
        customerid: {
            type:  String,
            default:''
        },
        variantid: {
            type:  String,
            default:''
        },
        variantpoduct: {
            type:  Boolean,
            default:false
        },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const cartmodel = mongoose.model('cart', order_schema )
module.exports = {
    cartmodel
}

