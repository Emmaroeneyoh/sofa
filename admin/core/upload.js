const multer = require('multer');

// Define where to store the uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Destination folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // File name
    }
});

const upload = multer({ storage: storage });

module.exports = {
    upload
}