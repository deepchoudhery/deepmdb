const dbQueries = require('../data/databaseQueries');
const imdb = require('../imdb');
var movies;
function Movie(imdbid, rating, name, description, img) {
    this.imdbid = imdbid || '';
    this.name = name || '';
    this.description = description || '';
    this.rating=rating || -1;
    this.img=img || '';
}

async function GetMoviesFromDb() {
    return await dbQueries.getMovies()
}

async function Setup() {
    imdb.scrapeImdb("/user/ur26735780/ratings", AddMoviesToDb);
}

function AddMoviesToDb(movies) {
    if(movies) {
        for (var movie of movies) {
            if(movie) {
                const id = movie.id;
                const rating = movie.rating;
                imdb.getMovieOMDB(movie).then(data => {
                    var movieModel = new Movie(id, rating, data.Title, data.Plot, data.Poster);
                    dbQueries.addMovie(movieModel);
                });
            }
        }
    }
}

module.exports = { Setup, Movie, GetMoviesFromDb, movies };
