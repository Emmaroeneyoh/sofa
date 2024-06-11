const mongoose = require('mongoose')
const schema = mongoose.Schema


const order_schema = new schema({
 
    cartexpired: {
        type:Boolean,   default : false
    },
   
 
    expiredtime: {
        type:String,  
    },
 
    price: {
        type:Number,  
    },
        bookingcode: {
            type:String,  
          },
        
        cart: [],
      
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const sharecartmodel = mongoose.model('shartcart', order_schema )
module.exports = {
    sharecartmodel
}