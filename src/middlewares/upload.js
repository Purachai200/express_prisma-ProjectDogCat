const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1]);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: imageFilter 
});

module.exports = upload;
