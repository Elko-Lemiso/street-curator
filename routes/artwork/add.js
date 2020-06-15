const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork');
const User = require('../../models/User');


router.get("/add/:artworkId", (req,res)=>{
    debugger
    Artwork.findById({_id : req.params.artworkId})
      .then(artwork =>{ 
        User
        .findOneAndUpdate({_id : req.session.currentUser._id}, {$push : {'visitedArtworks' : req.params.artworkId}})
      })
      .then(artwork=>{
          res.redirect('profile')
      })
      .catch(error => {
        console.error('Cannot render the artwork details', error);
      })
  })

module.exports = router;