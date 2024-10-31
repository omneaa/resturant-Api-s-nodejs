const express = require("express");
const { storage } = require("../../utils/cloudinary");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  let allowedExtensions = [
    ".jpeg",
    ".png",
    ".jpg",
  ];
  if (!allowedExtensions.includes(ext.toLowerCase())) {
    return cb(new Error("Only images allowed"), false);
  }

  cb(null, true);
};
const upload = multer({ storage, fileFilter });
var { AddItem,Menu,MenuFilter } = require("../Controllers/item");
router.post("/add-item", upload.single("img"), AddItem);
router.get("/menu", Menu);
router.get("/menu/:category", MenuFilter);
module.exports = router;


