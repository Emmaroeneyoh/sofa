const mongoose = require('mongoose')
const schema = mongoose.Schema

const categoryschema = new schema({
 
        category: {
            type:String,
        },
   
        categoryurl:{
            type:String , 
        },
    createdAt : {
        type: Date,
        default:Date.now
    }
})


const CategoryModel = mongoose.model('category', categoryschema )
module.exports = {
    CategoryModel
}