const mongoose = require('mongoose')
const schema = mongoose.Schema

const order_schema = new schema({
   
        sellerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'Seller'
        },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const featuredshopmodel = mongoose.model('featureshop', order_schema )
module.exports = {
    featuredshopmodel
}