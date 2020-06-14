const express = require('express');
const router  = express.Router();
const User = require('../../models/User.js')
const Review = require('../../models/Review.js')

router.post("/review", (res, req, next)=>{
    debugger
    console.log(req.body);
    let newReview = {
        artwork : req.body.id,
        creator : req.session.user._id,
        review : req.body.review
    }
    
    Review
    .create(newReview)
    .then((review)=>{
        console.log(review);
        res.redirect('/list');
    })
    .catch(error =>{
        console.log('Error :', error)
    })
})

module.exports = router;