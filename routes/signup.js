const express = require('express');
const router  = express.Router();
const User = require('../models/User')

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) =>{

debugger

    User.create({
        username: `${req.body.username}`,
        firstName: `${req.body.firstName}`,
        lastName: `${req.body.lastName}`,
        email: `${req.body.email}`,
        password: `${req.body.password}`,
        userType: `${req.body.userType}`
    })
        .then((user)=>{
            res.redirect('/');
            console.log(user);
        })
        .catch(error =>{
            console.log();
        })
})




module.exports = router;
