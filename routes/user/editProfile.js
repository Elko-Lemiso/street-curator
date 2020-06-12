const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

router.get('/editprofile', (req, res, next)=>{
    res.render('user/editProfile');
})

router.post('/editprofile', uploadCloud.single('profilePicture'), (req, res, next)=>{
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    debugger
    const findUser = req.session.currenUser;
    const change = {};

    if(req.body.password === ""){
        change = {
            username: `${req.body.username}`,
            firstName: `${req.body.firstName}`,
            lastName: `${req.body.lastName}`,
            email: `${req.body.email}`,
            userType: `${req.body.userType}`,
            profilePicture: {
            name: req.body.username,
            path: req.file.url,
            originalName: req.file.originalName
          }
        }
    } else {
        change = {
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
        }
    }

    User.findByIdAndUpdate(findUser, change)
        .then(user=>{
            
        })
        .catch(error=>{
            console.log(error, "Error updating userprofile")
        })
})

module.exports = router;
