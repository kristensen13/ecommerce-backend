const { Schema, model } = require("mongoose");

const EmployeeSchema = Schema({
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
  store: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Store",
  },
});

EmployeeSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = model("Employee", EmployeeSchema);
