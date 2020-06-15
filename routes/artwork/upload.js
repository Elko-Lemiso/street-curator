const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork')
const User = require('../../models/User')
const uploadCloud = require('../../config/cloudinary');

router.get('/upload', (req, res, next) => {
  res.render('artwork/upload');
});


router.post('/upload', uploadCloud.single('picture'), (req, res, next) =>{

    const location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      };

    const newArtWork = {
        city: req.body.city,
        reviews : [],
        description: req.body.description,
        location: location,
        artist: req.session.currentUser.username,
        artistId: req.session.currentUser._id,
        numberOfReviews: 0,
        likes: 0,
        visits: 0,
        incognito: req.body.incognito,
        picture: {
            fieldname: req.file.fieldname,
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path, nalname: req.file.originalName
        },
    }

    Artwork
        .create(newArtWork)
        .then((theNewArtWork)=>{
            return User.update({username: req.session.currentUser.username}, {$push: {artworks: theNewArtWork.id}})
        })
        .catch(error =>{
            console.log('This is the invalid field ->', error.field)
        })
        .then(()=>{
            res.redirect('/profile');
        })
        .catch(error =>{
            console.log('Error occured with redirecting', error);
        })
})


module.exports = router;

