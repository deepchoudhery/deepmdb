  
var sqlite3 = require('sqlite3');
var movieDb = new sqlite3.Database('data/sqlitedb');
var fs = require('fs');
var sqlSchema = fs.readFileSync('data/movieSchema.sql').toString();

module.exports = function() {
    movieDb.serialize(function() {
        movieDb.run(sqlSchema);
    });
};