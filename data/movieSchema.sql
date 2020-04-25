  
CREATE TABLE IF NOT EXISTS Movies
( 
    Name TEXT NOT NULL, 
    Description TEXT, 
    ImdbId TEXT PRIMARY KEY NOT NULL , 
    ImageUrl TEXT NOT NULL,
    Rating INT
);