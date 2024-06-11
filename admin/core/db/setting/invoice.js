const mongoose = require('mongoose')
const schema = mongoose.Schema

const ADMINschema = new schema({
 
        system: {
            type:String, default :'invoice'
    },
        url: {
            type:String,
    },
    
        address:{
            type:String
        },
        email:{
            type:String
        },
        phone:{
            type:String
        },
    createdAt : {
        type: Date,
        default:Date.now
    }
})


const invoiceModel = mongoose.model('invoice', ADMINschema )
module.exports = {
    invoiceModel
}