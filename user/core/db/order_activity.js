const mongoose = require('mongoose')
const schema = mongoose.Schema

const card_schema = new schema({
 
    activity: {
            type:String,  
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
const orderactivitymodel = mongoose.model('orderactivity', card_schema )
module.exports = {
    orderactivitymodel
}