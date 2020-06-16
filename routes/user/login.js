const express = require('express');
const router  = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcrypt');

router.post("/user/login", (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
      res.render("user/login", {
        errorMessage: "Please enter both, email and password to sign up."
      });
      return;
    }

  User.findOne({"email": email})
  .then(user =>{
      if (!user) {
          res.render("user/login", {
            errorMessage: "The email doesn't exist."
          });
          return;
        }
        if(bcrypt.compareSync(password, user.password)){
          req.session.currentUser = user;
          if (user.userType==="tourist") {
            req.session.artist = false
            req.session.tourist = true     
          }
          else if(user.userType==="artist"){
            req.session.artist = true
            req.session.tourist = false
          }
          console.log(res.session);
          res.redirect("/explore");
        }else{
          res.render("user/login", {
          errorMessage: "Incorrect password"
          });
        }
  })
  .catch(error => {
      next(error);
  })
})

router.get('/login', (req, res, next) => {
  res.render('user/login');
});

module.exports = router;