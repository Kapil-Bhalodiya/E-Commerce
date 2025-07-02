const multer = require('multer');
const path = require('path');

// File filter for images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only images (jpeg, jpg, png, gif) are allowed'));
};

// Dynamic multer factory
const createUpload = (folder) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `public/uploads/${folder}/`);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = path.extname(file.originalname);
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        }),
        fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 } // 5MB
    });
};

module.exports = { createUpload };