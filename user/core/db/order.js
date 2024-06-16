const mongoose = require('mongoose')
const schema = mongoose.Schema

const Orderschema = new schema({

    productid: {
        type:  mongoose.Schema.Types.ObjectId,
        ref:'Product' , default:null
    },
    userid: {
        type:  mongoose.Schema.Types.ObjectId,
        ref:'User' , default:null
    },
        quantity:{
            type:Number
        },
        price:{
            type:Number
        },
        subprice:{
            type:Number
        },
        status:{
            type:String , default :'pending'
        },
       
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const OrderModel = mongoose.model('Order', Orderschema )
module.exports = {
    OrderModel
}