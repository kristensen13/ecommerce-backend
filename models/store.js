const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  img: {
    type: String,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

StoreSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = mongoose.model("Store", StoreSchema);
