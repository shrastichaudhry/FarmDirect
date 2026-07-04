const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "FarmDirect",
    format: file.mimetype.split("/")[1], // jpg, png, jpeg
    public_id: Date.now().toString(),
  }),
});

const upload = multer({ storage });

module.exports = upload;