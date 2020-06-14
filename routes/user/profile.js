const express = require('express');
const router  = express.Router();
const User = require('../../models/User')
const Artwork = require('../../models/Artwork')

router.get('/profile', (req, res, next) => {
    if(!req.session.currentUser) res.redirect('/login')
    
    User.findOne({username: req.session.currentUser.username})
        .populate('artworks')
        .then((theUser)=>{

            console.log(theUser);
            res.render('user/profile', {theUser: theUser}); 
        })
        .catch((error)=>{
            console.log(error, 'Error')
        })

});

module.exports = router;