const mongoose = require('mongoose')
const schema = mongoose.Schema

const Wallet_schema = new schema({
 
        
        balance: {
            type:Number, default : 0
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
const WalletModel = mongoose.model('customerWallet', Wallet_schema )
module.exports = {
    WalletModel
}