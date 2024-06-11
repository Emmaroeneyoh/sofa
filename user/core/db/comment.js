const mongoose = require("mongoose");
const schema = mongoose.Schema;

const card_schema = new schema({
  comment: {
    type: String,
  },

  totalreplies: {
    type: Number,
    default: 0,
  },
 
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "customer" }],
    default: [],
  },
  replies: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogreply" }],
    default: [],
  },
  customerid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customer",
  },
  blogid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sellerBlog",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const commentModel = mongoose.model("blogcomment", card_schema);
module.exports = {
  commentModel,
};
