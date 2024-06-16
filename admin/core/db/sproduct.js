// models/Product.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  handle: { type: String },
  title: { type: String },
  bodyHtml: { type: String },
  vendor: { type: String },
  productCategory: { type: String },
  type: { type: String },
  tags: { type: String },
  published: { type: Boolean, default: false },
  options: [{
    name: { type: String },
    value: { type: String }
  }],
  variants: [{
    sku: { type: String },
    grams: { type: Number },
    inventoryTracker: { type: String },
    inventoryQty: { type: Number },
    inventoryPolicy: { type: String },
    fulfillmentService: { type: String },
    price: { type: Number },
    compareAtPrice: { type: Number },
    requiresShipping: { type: Boolean, default: true },
    taxable: { type: Boolean, default: true },
    barcode: { type: String }
  }],
  images: [{
    src: { type: String },
    altText: { type: String }
  }],
  giftCard: { type: Boolean, default: false },
  seo: {
    title: { type: String },
    description: { type: String }
  },
  googleShopping: {
    productCategory: { type: String },
    gender: { type: String },
    ageGroup: { type: String },
    mpn: { type: String },
    adWordsGrouping: { type: String },
    adWordsLabels: { type: String },
    condition: { type: String },
    customProduct: { type: String },
    customLabel0: { type: String },
    customLabel1: { type: String },
    customLabel2: { type: String },
    customLabel3: { type: String },
    customLabel4: { type: String }
  },
  internationalPricing: {
    unitedKingdom: {
      included: { type: Boolean, default: false },
      price: { type: Number },
      compareAtPrice: { type: Number }
    },
    europeanUnion: {
      included: { type: Boolean, default: false },
      price: { type: Number },
      compareAtPrice: { type: Number }
    },
    international: {
      included: { type: Boolean, default: false },
      price: { type: Number },
      compareAtPrice: { type: Number }
    }
  },
  status: { type: String }
});

// const ProductModel = mongoose.model('Product', productSchema);
// module.exports = {
//   ProductModel
// }
