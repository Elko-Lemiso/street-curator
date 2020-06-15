const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork')
const User = require('../../models/User')
const uploadCloud = require('../../config/cloudinary');

router.get('/update/:artworkId', (req, res, next) => {
    Artwork
    .findById(req.params.artworkId)
    .then(artwork =>{
        console.log(artwork);  
        res.render('artwork/update', {artwork})
      })
      .catch(error => {
        console.error('Cannot render the update page', error);
      })
});

router.post('/update/:artworkId', uploadCloud.single('picture'), (req, res, next) =>{
    debugger
    const location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      };
        const newArtWork = {
            city: req.body.city,
            description: req.body.description,
            location: location,
            incognito: req.body.incognito,
        }

    Artwork
        .findByIdAndUpdate(req.params.artworkId, newArtWork)
        .then((artwork)=>{
            console.log(artwork)
            res.redirect('/profile');
        })
        .catch(error =>{
            console.log('Error occured with redirecting', error);
        })
})


module.exports = router;