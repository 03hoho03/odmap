const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/slider', (req, res, next) => {
  const imagesPath = path.join(__dirname, '../../source/sliderImages');

  fs.readdir(imagesPath, (err, files) => {
    if (err) {
      return next(err);
    }

    const base64Images = [];

    files.forEach((file) => {
      const imagePath = path.join(imagesPath, file);

      fs.readFile(imagePath, (readErr, imageData) => {
        if (readErr) {
          return next(readErr);
        }

        const base64ImageData = imageData.toString('base64');
        base64Images.push(base64ImageData);

        if (base64Images.length === files.length) {
          res.json({ images: base64Images });
        }
      })
    })

  });
})

module.exports = router;