const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;

router.get('/editprofile', (req, res, next)=>{
    // req.session.curren
    res.render('user/editProfile'/* {user: req.session.currentUser}*/);
})


module.exports = router;
