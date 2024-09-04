const asyncHandler = require("express-async-handler");
const cloudinary = require("../helpers/cloudinaryConfig");
const Upload = require("../models/upload");
const { updateImage } = require("../helpers/update-image");

// const uploadFile = asyncHandler(async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     // res.json(result);

//     //Create Uploads
//     let imageUploads = new Upload({
//       name: req.body.name,
//       image: result.secure_url,
//       cloudinary_id: result.public_id,
//     });

//     // Save imageUploads in the database MongoDB
//     const createdImage = await imageUploads.save();
//     res.status(201).json({
//       cloudinaryResult: result,
//       databaseResult: createdImage,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Failed to upload image" });
//   }
// });
const uploadFile = asyncHandler(async (req, res) => {
  try {
    // Multer ya ha subido el archivo a Cloudinary, puedes acceder a la información directamente
    const type = req.params.type;
    const id = req.params.id;
    const { secure_url, public_id } = req.file;

    // Divide el nombre del archivo para obtener la extensión
    const nameSplit = secure_url.split(".");
    const fileExtension = nameSplit[nameSplit.length - 1];

    const nameSplit2 = public_id.split("/");
    const public_id_short = nameSplit2[nameSplit2.length - 1];

    const fileName = `${public_id_short}.${fileExtension}`;

    // Crear un nuevo documento de subida en MongoDB
    const imageUploads = new Upload({
      image: secure_url, // URL segura de la imagen en Cloudinary
      cloudinary_id: fileName, // ID público en Cloudinary
      type: req.params.type, // Tipo de imagen (e.g., 'users', 'stores')
      userId: req.params.id, // ID del usuario asociado
    });

    // Guardar el documento en la base de datos
    const createdImage = await imageUploads.save();

    res.status(201).json({
      ok: true,
      msg: "File uploaded",
      image: createdImage,
      fileName,
    });

    // Update database
    updateImage(type, id, fileName);

    // res.json({
    //   ok: true,
    //   msg: "File uploaded",
    //   fileName,
    // });
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

module.exports = {
  uploadFile,
  returnImage,
};
