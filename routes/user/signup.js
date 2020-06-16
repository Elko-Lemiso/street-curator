const express = require('express');
const router  = express.Router();
const User = require('../../models/User')
const uploadCloud = require('../../config/cloudinary');

router.get('/signup', (req, res, next) => {
  res.render('user/signup');
});

router.post('/signup', uploadCloud.single('profilePicture'), (req, res, next) =>{

    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;
    const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);

    let newUser = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        userType: req.body.userType
    }
    
    if(req.file) {
        newUser.profilePicture = {
            fieldname: req.file.fieldname,
            filename: req.file.filename,
            originalname: req.file.originalname,
            path: req.file.path,
        }
    }


    // to check if all fields are filled
    if (!newUser.username || !newUser.email || !newUser.password) {
        res.render('user/signup', { errorMessage: 'Please fill in the required fields.' });
        return;
    }
    
    // make sure passwords are strong:
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!regex.test(newUser.password)) {
    res
        .status(400)
        .render('user/signup', { errorMessage: 'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.' });
    return;
    }

    User
        .create(newUser)
        .then((user)=>{
            res.redirect('/login');
            console.log(user);
        })
        .catch(error =>{
            console.log('This is the invalid field ->', error.field)
        })
})

module.exports = router;

