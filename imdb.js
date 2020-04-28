var dotenv = require('dotenv');
const axios = require('axios')
const cheerio = require('cheerio')

dotenv.config({path: __dirname + '/variables.env'});
const baseImdbURL = "http://www.imdb.com"
var prevUrl = '';

let scrapeImdb = function get(userUrl, res) {
    var movies = [];
    url = baseImdbURL + userUrl;
    axios.get(url)
        .then(response => {
            const html = response.data;
            const $ = cheerio.load(html)

            $(".lister-item-content").each(function (i, element) {
                const $element = $(element)
                const $movieId = $element.find('h3.lister-item-header a')
                const $rating = $element.find('div.ipl-rating-star.ipl-rating-star--other-user.small span.ipl-rating-star__rating')
                const movie = {
                    id: getMovieID($movieId.attr('href')),
                    rating: $rating.text()
                }
                movies.push(movie);
            })

            var nextButton = $("a.flat-button.lister-page-next.next-page");
            if (nextButton.length) {
                nextButton.each(function (i, element) {
                    const $element = $(element)
                    const $url = $element.attr('href')
                    if ($url) {
                        prevUrl = url
                        url = $url
    
                        res(movies)
                        console.log('call another get at - ' + url)
                        get(url, res)
                    }
                })
            }
            else {
                res(movies);
            }
        })

        .catch(error => {
            console.log(error)
        })
}


function getMovieID(url) {
    var regex = new RegExp('/tt.*\/');
    var result = regex.exec(url)[0]
    return result.substr(1, result.length - 2)
}

function getMovieOMDB(movie) {
    var omdbUrl = process.env.OMDB_URL;
    var omdbApiKey = process.env.OMDB_API_KEY;
    imdbUrl = omdbUrl + movie.id + omdbApiKey;
    return axios.get(imdbUrl)
        .then(response => {
            return response.data;
        })

        .catch(error => {
            console.log(error)
        })
}

module.exports = { scrapeImdb, getMovieOMDB }