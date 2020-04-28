var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    var movieModel = req.app.get('movieModel');
    var allMovies = await movieModel.GetMoviesFromDb();
    var movieList = allMovies;
    var start = req.query.start;
    var end = req.query.end;
    if (start && end) {
        start = parseInt(start);
        end = parseInt(end);
        if (!(start < end && start >= 0 && end < allMovies.length)) {
            start = 0;
         }
        movieList = movieList.slice(start, end);
    }
    res.render('ratings', { title: 'ratings', movies: movieList });
});

module.exports = router;
