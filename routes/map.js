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
// router.get('/map/api', (req, res, next) => {
// 	Artwork.find({}, (error, allArtworksFromDB) => {
// 		if (error) { 
// 			next(error); 
// 		} else { 
// 			res.status(200).json({ artworks: allArtworksFromDB });
// 		}
// 	});
// });

// to see raw data in your browser, just go on: http://localhost:3000/map/api/someIdHere
// router.get('/map/api/:id', (req, res, next) => {
// 	let artworkId = req.params.id;
// 	Artwork.findOne({_id: artworkId}, (error, oneArtworkFromDB) => {
// 		if (error) { 
// 			next(error) 
// 		} else { 
// 			res.status(200).json({ artwork: oneArtworkFromDB }); 
// 		}
// 	});
// });

module.exports = router;
