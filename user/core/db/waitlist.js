const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
  
   email: {
        type:String,
    },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const customerwaitlistModel = mongoose.model('customer_waitlist', post_schema)
module.exports = {
    customerwaitlistModel
}