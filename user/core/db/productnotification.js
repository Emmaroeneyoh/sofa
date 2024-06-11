const mongoose = require('mongoose')
const schema = mongoose.Schema

const Customermailsubscriptionschema = new schema({
 
        email: {
            type:String,
        },
       
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const emailsubscriptionModel = mongoose.model('emailsubscription', Customermailsubscriptionschema )
module.exports = {
    emailsubscriptionModel
}