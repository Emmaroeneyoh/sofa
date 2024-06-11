const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
        
    cart: {
            type : Array , default : [{}]
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
const wishlistModel = mongoose.model('customerwishlist', Wallet_schema )
module.exports = {
    wishlistModel
}