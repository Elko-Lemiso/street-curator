const express = require('express');
const router  = express.Router();

router.get('/collection', (req, res, next) => {
  res.render('user/collection');
});

module.exports = router;