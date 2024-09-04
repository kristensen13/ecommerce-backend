const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../helpers/cloudinaryConfig"); // Importa la configuración de Cloudinary
const { v4: uuidv4 } = require("uuid");

// Configura el almacenamiento para usar Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Extrae `type` e `id` de los parámetros de la URL
    const type = req.params.type;

    // Genera un nombre único para el archivo
    const fileName = `${uuidv4()}`;

    return {
      folder: `${type}`, // Nombre de la carpeta en Cloudinary
      allowedFormats: ["jpg", "jpeg", "png", "gif", "webp"], // Formatos permitidos
      public_id: `${fileName}`, // Nombre único para el archivo en Cloudinary
    };
  },
});

// Crea la instancia de multer con la configuración de almacenamiento
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const validExtensions = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];
    if (validExtensions.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error("Only .png, .jpg, .jpeg, .gif, .webp format allowed!"),
        false
      );
    }
  },
}).single("image"); // Espera un solo archivo llamado "image"

// Middleware para manejar la subida
const multerConfig = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    // Verifica y asegura que los valores se asignen correctamente a req.file
    if (req.file && req.file.path) {
      req.file.secure_url = req.file.path; // Puedes ajustar aquí si es necesario
      req.file.public_id = req.file.filename; // Ajuste basado en la estructura de Cloudinary
    }
    next(); // Llama a la siguiente función en la cadena de middleware
  });
};

module.exports = multerConfig;
