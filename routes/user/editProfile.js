const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

router.get('/editprofile', (req, res, next)=>{
    User.findOne({username: 'nardo'})
        .then((user)=>{
            // const tourist = true;
            // if (user.userType === 'tourist'){tourist = true}
            // else {tourist = false}
            res.render('user/editProfile', {user});
        })
        .catch((error)=>{
            console.log('Error', error)
        })
})

module.exports = router;