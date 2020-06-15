const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const Artwork =  require('../../models/Artwork');

router.get('/delete/:artworkId', (req, res, next)=>{
    debugger
if (req.session.tourist) {
    User.findOneAndUpdate({ _id: req.session.currentUser._id} , {$pull :{'visitedArtworks' : req.params.artworkId}})
        .then(()=>{
            res.redirect('/profile');
        })
        .catch((error)=>{
            console.log(error, "error");
        })
}
if (req.session.artist) {
    Artwork
        .deleteOne({_id: req.params.artworkId})
        .then(()=>{
            return User.findOneAndUpdate({ _id: req.session.currentUser._id} , {$pull :{'artworks' : req.params.artworkId}})
        })
        .then(()=>{
            res.redirect('/profile');
        })
        .catch((error)=>{
            console.log(error, "error");
        })
}
    
})

module.exports = router;