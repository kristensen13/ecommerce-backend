const asyncHandler = require("express-async-handler");
const cloudinary = require("../helpers/cloudinary-config");
const Upload = require("../models/upload");
const { updateImage } = require("../helpers/update-image");
const fs = require("fs");

const uploadFile = asyncHandler(async (req, res) => {
  try {
    const type = req.params.type;
    const id = req.params.id;

    if (!req.files || !req.files.image) {
      return res.status(400).json({ ok: false, msg: "No file uploaded" });
    }

    const file = req.files.image;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: type,
      public_id: `${id}_${Date.now()}`,
      allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
    });

    const nameSplit = result.secure_url.split(".");
    const fileExtension = nameSplit[nameSplit.length - 1];

    const nameSplit2 = result.public_id.split("/");
    const public_id_short = nameSplit2[nameSplit2.length - 1];

    const fileName = `${public_id_short}.${fileExtension}`;

    const imageUploads = new Upload({
      image: result.secure_url,
      cloudinary_id: fileName,
      type: type,
      userId: id,
    });

    const createdImage = await imageUploads.save();

    fs.unlinkSync(file.tempFilePath);

    res.status(201).json({
      ok: true,
      msg: "File uploaded",
      image: createdImage,
      fileName,
    });

    updateImage(type, id, fileName);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error uploading the image",
    });
  }
});

const returnImage = asyncHandler(async (req, res) => {
  try {
    const { type, image } = req.params;

    // Buscar la imagen en la base de datos según el type y cloudinary_id
    const upload = await Upload.findOne({ type: type, cloudinary_id: image });

    if (!upload) {
      return res.status(404).json({
        ok: false,
        msg: "Image not found",
      });
    }

    // Devolver la URL de la imagen si se encuentra
    res.status(200).json({
      ok: true,
      image: upload.image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error retrieving the image",
    });
  }
});

module.exports = { uploadFile, returnImage };
