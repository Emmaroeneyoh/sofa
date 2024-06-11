const mongoose = require('mongoose')
const schema = mongoose.Schema

const card_schema = new schema({
 

        reply: {
            type:String,
        },

        customerid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'customer'
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "customer" }],
        default: [],
      },
       blogid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'sellerBlog'
        },
       commentid: {
            type:  mongoose.Schema.Types.ObjectId,
            ref:'blogcomment'
        },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})
const replyModel = mongoose.model('blogreply', card_schema )
module.exports = {
   replyModel
}