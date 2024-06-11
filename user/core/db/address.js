const mongoose = require('mongoose')
const schema = mongoose.Schema

const address_schema = new schema({
 
        address: {
            type:String,  
        },
        defaultaddress: {
            type:Boolean,  default : false 
        },
        postalcode: {
            type:String,
        },
        country: {
            type:String,
        },
        state: {
            type:String,
        },
        city: {
            type:String,
    },
    cordinate: {
        latitiude: {
            type:String
    },
        longitude: {
            type:String
    },
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
const AddressModel = mongoose.model('customeraddress', address_schema )
module.exports = {
    AddressModel
}