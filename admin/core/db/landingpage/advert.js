const mongoose = require('mongoose')
const schema = mongoose.Schema

const order_schema = new schema({
   
        image: {
            type:  String,
        },
        contentid: {
            type:  String,
        },
        contenttype: {
            type:  String,
        },
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const advertmodel = mongoose.model('advert', order_schema )
module.exports = {
    advertmodel
}