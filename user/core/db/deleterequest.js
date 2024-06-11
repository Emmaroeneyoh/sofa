const mongoose = require('mongoose')
const schema = mongoose.Schema

const post_schema = new schema({
 
    request_approved: {
        type:Boolean , default : false
    },

    reason: {
        type:String
    },
    name: {
        type:String
    },
    email: {
        type:String
    },
    
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const customerdeleterequestmodel = mongoose.model('customerdeleterequest', post_schema)
module.exports = {
    customerdeleterequestmodel
}