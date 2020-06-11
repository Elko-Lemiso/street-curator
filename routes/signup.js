const express = require('express');
const router  = express.Router();
const User = require('../models/User')
const uploadCloud = require('../config/cloudinary');

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', uploadCloud.single('profilePicture'), (req, res, next) =>{
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    User
        .create({
            username: `${req.body.username}`,
            firstName: `${req.body.firstName}`,
            lastName: `${req.body.lastName}`,
            email: `${req.body.email}`,
            password: `${hash}`,
            userType: `${req.body.userType}`,
            profilePicture: {
                name: req.body.username,
                path: req.file.url,
                originalName: req.file.originalName
              }
        })
        .then((user)=>{
            res.redirect('/');
            console.log(user);
        })
        .catch(error =>{
            console.log('This is the invalid field ->', error.field)
        })
})

module.exports = router;
