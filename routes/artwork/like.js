const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork');
const text = require('body-parser/lib/types/text');


router.get("/like/:artworkId", (req,res)=>{
    Artwork.findOneAndUpdate({_id : req.params.artworkId}, {$inc : {'likes' : 1}})
      .then(artwork =>{ 
        res.render('details', {artwork})
      })
      .catch(error => {
        console.error('Cannot render the artwork details', error);
      })
  })

module.exports = router;