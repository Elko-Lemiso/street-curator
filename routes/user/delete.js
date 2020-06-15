const express = require('express');
const router  = express.Router();
const User = require('../../models/User');

router.get('/user/delete', (req, res, next)=>{
    User.findOneAndDelete({ username: req.session.currentUser.username})
        .then(()=>{
            res.redirect('/signup');
        })
        .catch((error)=>{
            console.log(error, "error");
        })
})

module.exports = router;