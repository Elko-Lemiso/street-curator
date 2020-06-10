const express = require('express');
const router  = express.Router();
const User = require('../models/User')

router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.post('/signup', (req, res, next) =>{
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
            userType: `${req.body.userType}`
        })
        .then((user)=>{
            res.redirect('/');
            console.log(user);
        })
        .catch(error =>{
            console.log(error);
        })
})

module.exports = router;

// bcrypt.compare(myPlaintextPassword, hash).then(function(result) {
//     // result == true
// });