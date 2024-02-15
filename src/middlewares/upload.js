const multer = require("multer");
const { v4: uuidv4 } = require('uuid');

// ตรวจสอบว่าไฟล์ที่อัปโหลดเป็นไฟล์ภาพหรือไม่
const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const id = uuidv4();
    cb(null, uuidv4() + "." + file.mimetype.split("/")[1])
  },
});

// ใช้คุณสมบัติ fileFilter เพื่อกรองไฟล์ที่อัปโหลด
const upload = multer({ 
  storage: storage,
  fileFilter: imageFilter 
});

module.exports = upload;
