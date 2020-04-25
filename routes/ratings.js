var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    var movieModel = req.app.get('movieModel');
    var movieList = await movieModel.GetMoviesFromDb();
    res.render('ratings', { title: 'ratings', movies: movieList });
});

module.exports = router;
