const { Schema, model } = require("mongoose");

const StoreSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  img: {
    type: String,
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

StoreSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Store", StoreSchema);
