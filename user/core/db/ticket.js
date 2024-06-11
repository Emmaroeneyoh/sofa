const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
  
   request: {
        type:String,
    },
   ticketstatus: {
        type:Boolean,  default: true
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
const customerticketModel = mongoose.model('customer_ticket', post_schema)
module.exports = {
    customerticketModel
}