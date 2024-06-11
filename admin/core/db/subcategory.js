const mongoose = require('mongoose')
const schema = mongoose.Schema

const categoryschema = new schema({
 
        subcategory: {
            type:String,
        },
    createdAt : {
        type: Date,
        default:Date.now
    }
})


const subcategoryModel = mongoose.model('subcategory', categoryschema )
module.exports = {
    subcategoryModel
}