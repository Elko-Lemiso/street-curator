const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork');
const User = require('../../models/User');


router.get("/add/:artworkId", (req,res,next)=>{
  debugger
    Artwork
      .findById({_id : req.params.artworkId})
      .then(artwork =>{ 
        return User.findOneAndUpdate({_id : req.session.currentUser._id}, {$push : {'visitedArtworks' : artwork._id}})
      })
      .then(()=>{
        res.redirect('/profile')
      })
      .catch(error => {
        console.error('Cannot add to collection', error);
      })
  })

module.exports = router;