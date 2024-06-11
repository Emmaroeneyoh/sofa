const mongoose = require('mongoose')
const schema = mongoose.Schema

const card_schema = new schema({
 
    card_number: {
            type:String,  
        },
        card_name: {
            type:String,
        },
        card_cvv: {
            type:String,
        },
        expire_date: {
            type:String,
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
const CardModel = mongoose.model('customercard', card_schema )
module.exports = {
    CardModel
}