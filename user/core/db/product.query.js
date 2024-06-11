const mongoose = require('mongoose')
const schema = mongoose.Schema

const card_schema = new schema({
    query: {
            type:String,  
        },
        customerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'customer'
        },
        sellerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'Seller'
        },
        productid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const productquerymodel = mongoose.model('productQuery', card_schema )
module.exports = {
    productquerymodel
}