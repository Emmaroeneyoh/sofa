const mongoose = require('mongoose')
const schema = mongoose.Schema

const order_schema = new schema({
   
        productid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const flashsalemodel = mongoose.model('flashsale', order_schema )
module.exports = {
    flashsalemodel
}