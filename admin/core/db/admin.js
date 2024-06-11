const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ADMINschema = new schema({
  email: {
    type: String,
  },

  password: {
    type: String,
  },
  phone: {
    type: String,
  },
  name: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AdminModel = mongoose.model("admin", ADMINschema);
module.exports = {
  AdminModel,
};
