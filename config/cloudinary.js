const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const express = require('express');
const multer = require('multer');
require('dotenv').config();
 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});
 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'street-curator-profile-picture',
    allowedFormats: ['jpg', 'png'],
    filename: function (req, file, cb) {
        cb(null, file.originalName);
      }
});

const uploadCloud = multer({ storage: storage });
 
module.exports = uploadCloud;