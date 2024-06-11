const mongoose = require('mongoose')
const schema = mongoose.Schema

const card_schema = new schema({
 
        customerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'customer'
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
const reorderhistorymodel = mongoose.model('reorderhistory', card_schema )
module.exports = {
    reorderhistorymodel
}