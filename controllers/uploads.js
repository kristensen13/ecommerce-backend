const path = require("path");
const fs = require("fs");

const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const uploadFile = (req, res = response) => {
  const type = req.params.type;
  const id = req.params.id;

  // Valid types
  const validTypes = ["users", "stores", "employees", "products", "categories"];
  if (!validTypes.includes(type)) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid type",
    });
  }

  console.log(req.files);

  // Validate that there is a file
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      ok: false,
      msg: "No files were uploaded.",
    });
  }

  // Process the image...
  const file = req.files.image;

  const nameSplit = file.name.split(".");
  const fileExtension = nameSplit[nameSplit.length - 1];

  // Validate file extension
  const validExtensions = ["png", "jpg", "jpeg", "gif", "webp"];
  if (!validExtensions.includes(fileExtension)) {
    return res.status(400).json({
      ok: false,
      msg: "Invalid file extension",
    });
  }

  // Generate file name
  const fileName = `${uuidv4()}.${fileExtension}`;

  // Path to save the file
  const path = `./uploads/${type}/${fileName}`;

  // Move the file to the path
  file.mv(path, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        ok: false,
        msg: "Error moving the file",
      });
    }

    // Update database
    updateImage(type, id, fileName);

    res.json({
      ok: true,
      msg: "File uploaded",
      fileName,
    });
  });
};

const returnImage = (req, res = response) => {
  const type = req.params.type;
  const image = req.params.image;

  const pathImg = path.join(__dirname, `../uploads/${type}/${image}`);

  // Default image
  if (fs.existsSync(pathImg)) {
    res.sendFile(pathImg);
  } else {
    const pathImg = path.join(__dirname, "../uploads/no-img.jpg");
    res.sendFile(pathImg);
  }
};

module.exports = {
  uploadFile,
  returnImage,
};
