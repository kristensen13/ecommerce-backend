const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
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
  store: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Store",
  },
});

EmployeeSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = mongoose.model("Employee", EmployeeSchema);
