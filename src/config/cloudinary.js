const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dm6x9ox4t",
  api_key: "963457972441785",
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = cloudinary;
