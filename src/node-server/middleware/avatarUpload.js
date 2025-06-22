// src/node-server/middleware/avatarUpload.js
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadRoot = path.join(__dirname, '..', 'uploads');
const avatarDir = path.join(uploadRoot, 'avatars');
fs.mkdirSync(avatarDir, { recursive: true });

let counter = 0;
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, avatarDir),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const basename = Date.now() + '-' + counter++;
        cb(null, basename + ext);
    }
});

module.exports = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Only images allowed'), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});
