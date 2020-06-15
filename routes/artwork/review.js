const express = require('express');
const router  = express.Router();
const Artwork = require('../../models/Artwork.js')
const Review = require('../../models/Review.js')

router.post("/review", (res, req, next)=>{
    debugger
    console.log(res.body);
    let newReview = {
        artwork : res.body.id,
        creator : res.session.currentUser.username,
        review : res.body.review
    }
    Review
    .create(newReview)
    .then(review=>{
         return Artwork.findOneAndUpdate({_id : res.body.id}, {$inc : {'numberOfReviews' : 1}}).findOneAndUpdate({_id : res.body.id}, {$push: {'reviews': review.id}})
    })
    .then((review)=>{
        console.log(review);
        req.redirect('back');
    })
    .catch(error =>{
        console.log('Error :', error)
    })

    
        .catch(error =>{
            console.log('Error :', error)
        })

})

module.exports = router;