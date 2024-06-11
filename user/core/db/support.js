const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   text: {
        type:String,
        
    },
  type: {
        type:String,
        
    },
   
    customerid: {  
        type:  mongoose.Schema.Types.ObjectId,
         ref:'customer'
    },
   ticketid: {
        type:  mongoose.Schema.Types.ObjectId,
         ref:'customer_ticket'
    },
    usertype: {
        type: String,
         
    },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const customersupportModel = mongoose.model('customersupport', post_schema)
module.exports = {
    customersupportModel
}