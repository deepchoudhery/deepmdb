var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('top', { title: 'TOP', movies: [] });
});

module.exports = router;