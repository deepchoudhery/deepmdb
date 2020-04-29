var sqlite3 = require('sqlite3');
var movieDb = new sqlite3.Database('data/sqlitedb');
let addMovie = function (movie) {
    var Name = movie.name;
    var Description = movie.description;
    var ImdbId = movie.imdbid;
    var ImageUrl = movie.img;
    var Rating = movie.rating;

    var sql = `insert or ignore into Movies (Name, Description, ImdbId, ImageUrl, Rating) 
            VALUES 
            (?, ?, ?, ?, ?);`;

    var values = [Name, Description, ImdbId, ImageUrl, Rating];

    movieDb.serialize(function () {
        movieDb.run(sql, values, function (err) {
            if (err) {
                console.log("Failed to add movie with name - " + values[0] + " and id - " + values[1]);
            }
        });
    });
}

let getMovieFromDb = function (movieId, res) {
    var sql = "SELECT * FROM Movies WHERE ImdbId == " + movieId;
    processData(sql, res);
}

let getMovies = async function () {
    var sql = "SELECT * FROM Movies";
    return await processData(sql);
}

function processData(sql) {
    return new Promise((resolve, reject) => {
        movieDb.all(sql, (err, rows) => {
            if (err) {
                console.error(err);
                reject(err);
            }
            else {
                resolve(rows);
            }
        })
    });
}

module.exports = { addMovie, getMovies, getMovieFromDb }