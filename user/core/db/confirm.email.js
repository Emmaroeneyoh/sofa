const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
    
   email: {
        type:String, //string or text
        
    },
   code: {
        type:String,
        
    },
    code_used: {
        type:Boolean , default : false
    },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const customer_emailModel = mongoose.model('customer_email', post_schema)
module.exports = {
    customer_emailModel
}