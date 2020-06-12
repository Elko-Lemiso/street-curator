const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const uploadCloud = require('../../config/cloudinary');

router.get('/editprofile', (req, res, next)=>{
    User.findOne({ username: req.session.currentUser.username})
        .then((theUser)=>{
            res.render('user/editProfile', {theUser: theUser});
        })
        .catch(error=>{
            console.log('error', error);
            res.redirect('/login');
        })
})

router.post('/editprofile', (req, res, next)=>{
    
    debugger

    const username = req.body.username;

    const findUser = req.session.currentUser;
    const change = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
        }

    User.findByIdAndUpdate(findUser, change)
        .then(()=>{
            res.render('user/editProfile');
        })
        .catch(error=>{
            console.log(error, "Error updating userprofile")
        })
})

module.exports = router;

    // const bcrypt = require('bcrypt');
    // const saltRounds = 10;
    // const myPlaintextPassword = req.body.password;
    // const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    // password: `${req.body.password}`,
    // ,profilePicture: {
    //     name: req.body.username,
    //     path: req.file.url,
    //     originalName: req.file.originalName
    // }