const multer = require('multer');
const path = require('path');

// Mapa de mimetypes permitidos con sus extensiones esperadas
const TIPOS_PERMITIDOS = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png']
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads/');
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const nombre = `${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;
    cb(null, nombre);
  }
});

// Validación cruzada: mimetype + extensión real
const fileFilter = (req, file, cb) => {
  const mimetype = file.mimetype;
  const extension = path.extname(file.originalname).toLowerCase();

  const extensionesPermitidas = TIPOS_PERMITIDOS[mimetype];

  if (!extensionesPermitidas) {
    return cb(new Error('Formato no permitido. Solo PDF, Word, JPG o PNG.'), false);
  }

  if (!extensionesPermitidas.includes(extension)) {
    return cb(new Error('La extensión del archivo no coincide con su tipo real.'), false);
  }

  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1                    // solo 1 archivo por request
  }
});

module.exports = upload;