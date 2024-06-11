const mongoose = require('mongoose')
const schema = mongoose.Schema

const ADMINschema = new schema({
 
        system: {
            type:String, default :'smtp'
    },
        host: {
            type:String,
    },
    
        port:{
            type:Number
        },
        username:{
            type:String
        },
        password:{
            type:String
        },
       
        mailfromaddress:{
            type:String
        },
       
        mailfromname:{
            type:String
        },
       
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})


const smtpModel = mongoose.model('smtp', ADMINschema )
module.exports = {
    smtpModel
}