var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('theatres', { title: 'coming soon brb :)', movies: [] });
});

module.exports = router;
