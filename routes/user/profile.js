const express = require('express');
const router  = express.Router();
const User = require('../../models/User.js')
const Artwork = require('../../models/Artwork.js')

router.get('/profile', (req, res, next) => {

    if(!req.session.currentUser) res.redirect('/login')

    User.findOne({_id: req.session.currentUser._id})
        .populate({
            path :'artworks', 
            populate : {path: 'reviews'}
        })
        .populate({
            path :'visitedArtworks', 
            populate : {path: 'reviews'}
        })
        .then((theUser)=>{
            console.log(theUser);
            res.render('user/profile', {theUser}); 
        })
        
        .catch((error)=>{
            console.log(error, 'Error')
        })
});

module.exports = router;