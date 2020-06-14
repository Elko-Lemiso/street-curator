const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork.js')
const Review = require('../../models/Review.js')

router.post("/review", (res, req, next)=>{
    debugger
    console.log(res.body);
    let newReview = {
        artwork : res.body.id,
        creator : res.session.currentUser._id,
        review : res.body.review
    }
    Artwork
        .findOneAndUpdate({_id : res.body.id}, {$inc : {'numberOfReviews' : 1}})
        .catch(error =>{
            console.log('Error :', error)
        })

    Review
    .create(newReview)
    .then((review)=>{
        console.log(review);
        req.redirect('/list');
    })
    .catch(error =>{
        console.log('Error :', error)
    })
})

module.exports = router;