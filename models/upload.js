const mongoose = require("mongoose");

const UploadSchema = mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    // },
    image: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

UploadSchema.method("toJSON", function () {
  const { __v, ...object } = this.toObject();
  return object;
});

module.exports = mongoose.model("Upload", UploadSchema);
