const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post("/user/login", (req, res, next)=>{
  const email = req.body.email;
  const password = req.body.password;

  if (email === "" || password === "") {
      res.render("login", {
        errorMessage: "Please enter both, email and password to sign up."
      });
      return;
    }

  User.findOne({"email": email})
  .then(user =>{
      if (!user) {
          res.render("login", {
            errorMessage: "The email doesn't exist."
          });
          return;
        }
        if(bcrypt.compareSync(password, user.password)){
          res.redirect("/");
        }else{
          res.render("login", {
          errorMessage: "Incorrect password"
          });
        }
  })
  .catch(error => {
      next(error);
  })
})

router.get('/login', (req, res, next) => {
  res.render('login');
});

module.exports = router;