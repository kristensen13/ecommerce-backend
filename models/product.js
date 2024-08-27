const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  store: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Store",
  },
  category: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  user: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

ProductSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Product", ProductSchema);
