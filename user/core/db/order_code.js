const mongoose = require('mongoose')
const schema = mongoose.Schema

const card_schema = new schema({
 
    order_code: {
            type:String,  
        },
    code_used: {
            type:Boolean,  default : false 
        },
        
        customerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'customer'
        },
        orderid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'customer_order'
        },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const ordercodemodel = mongoose.model('ordercode', card_schema )
module.exports = {
    ordercodemodel
}