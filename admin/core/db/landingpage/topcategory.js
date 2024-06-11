const mongoose = require('mongoose')
const schema = mongoose.Schema

const topcategoryschema = new schema({
    categoryid: {
        type:  mongoose.Schema.Types.ObjectId,
         ref:'category'
    },
   
    createdAt : {
        type: Date,
        default:Date.now
    }
})


const TopCategoryModel = mongoose.model('topcategory', topcategoryschema )
module.exports = {
    TopCategoryModel
}