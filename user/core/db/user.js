const mongoose = require('mongoose')
const schema = mongoose.Schema

const Userschema = new schema({

        email: {
            type:String,
        },
        password:{
            type:String
        },
        name:{
            type:String
        },
        // phone:{
        //     type:String , default : ''
        // },
        // postalcode:{
        //     type:String , default : ''
        // },
        // address:{
        //     type:String , default : ''
        // },
       
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const UserModel = mongoose.model('User', Userschema )
module.exports = {
    UserModel
}