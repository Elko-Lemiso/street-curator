const express = require('express');
const router  = express.Router();
const User = require('../../models/User');

router.get('/switch', (req, res, next)=>{
    User.findOne(req.session.currentUser)
    .then(user =>{
        if (user.userType === "artist") {
            res.render("login", {
                errorMessage: "The email doesn't exist."
              });
              res.redirect('/explore');
        }   
    })
    .catch(error => {
        next(error);
    })
})