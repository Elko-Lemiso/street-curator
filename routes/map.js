const express = require('express');
const router  = express.Router();
const Artwork = require('../models/Artwork');

router.get('/map', (req, res, next) => {
  res.render('map');
});

router.get('/list', (req, res, next) => {
	Artwork
	.find({})
	.then(allLocations=>{
		res.render('list' , {allLocations});
	})
	.catch(error => {
        console.error('Cannot render locations', error);
      })
  });

  
// to see raw data in your browser, just go on: http://localhost:3000/map/api
router.get('/map/api', (req, res, next) => {
    Artwork.find({})
        .then((allArtworksFromDB)=>{
            res.json({ artworks: allArtworksFromDB });
        })
        .catch((error)=>{
            console.log(error, 'error getting all artworks and population into json');
            next(error);
        })
});


// to see raw data in your browser, just go on: http://localhost:3000/map/api/someIdHere
router.get('/map/api/:id', (req, res, next) => {
	let artworkId = req.params.id;
    Artwork.findOne({_id: artworkId})
        .then((oneArtworkFromDB)=>{
            res.json({ artwork: oneArtworkFromDB });
        })
        .catch((error)=>{
            console.log(error, 'error getting artwork and population into json');
            next(error);
        })
});

router.get('/map/:id', (req, res, next) => {
    let cityName = req.params.id;
    
    res.render('map', {cityName});
});


module.exports = router;
