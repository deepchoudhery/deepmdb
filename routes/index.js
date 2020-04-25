var express = require('express');
var router = express.Router();

/* GET home page(also in theatres page) */
router.get('/', async function(req, res, next) {
  res.render('index', { title: 'Updates' });
});

module.exports = router;
