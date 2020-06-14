const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork');
const text = require('body-parser/lib/types/text');


router.get("/artwork/details/:artworkId", (req,res)=>{
    Artwork
      .findById(req.params.artworkId)
      .then(artwork =>{
        console.log(artwork);  
        res.render('details', {artwork})
      })
      .catch(error => {
        console.error('Cannot render the artwork details', error);
      })
  })

module.exports = router;