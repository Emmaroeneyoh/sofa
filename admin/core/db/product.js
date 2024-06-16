const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Productschema = new schema({
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  productblocked: {
    type: Boolean, default : false
  },

  quantity: {
    type: Number,
  },

  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
  },

  category:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
 
  coverimage: {
    type: String,
  },
  images: {
    default: [],
    type: [
      {
        url: {
          type: String,
        }
      },
    ],
  },
  
  description: {
    type: String,
  },

 

  productpublished: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 0,
  },
  

  variants: {
    type: Array,
    default: [{}],
  },
  recommended: {
    type: Array,
    default: [{}],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Productschema.index({ name: "text" });
const ProductModel = mongoose.model("Product", Productschema);
module.exports = {
  ProductModel,
};
