const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/about/artist', (req, res, next) => {
  req.session.artist = true
  req.session.tourist = false
  res.render('about');
});

router.get('/about/tourist', (req, res, next) => {
  req.session.artist = false
  req.session.tourist = true
  res.render('about');
});

module.exports = router;