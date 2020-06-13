const express = require('express');
const router  = express.Router();

router.get('/explore', (req, res, next) => {
    if(req.session.currentUser)res.render('explore');
    else res.redirect('/login');
});

module.exports = router;