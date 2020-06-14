const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork')
const uploadCloud = require('../../config/cloudinary');

router.get('/upload', (req, res, next) => {
  res.render('artwork/upload');
});


router.post('/upload', uploadCloud.single('picture'), (req, res, next) =>{

    const location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      };

    debugger

    const newArtWork = {
        city: req.body.city,
        description: req.body.description,
        location: location,
        artist: req.session.currentUser.username,
        artistId: req.session.currentUser._id,
        likes: 0,
        visits: 0,
        incognito: req.body.incognito,
        picture: {
            fieldname: req.file.fieldname,
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,nalname: req.file.originalName
        },
    }

    console.log(newArtWork);
    Artwork
        .create(newArtWork)
        .then((user)=>{
            res.redirect('/explore');
        })
        .catch(error =>{
            console.log('This is the invalid field ->', error.field)
        })
})


module.exports = router;

