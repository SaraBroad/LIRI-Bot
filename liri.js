require("dotenv").config();
// //*require any node packages that I installed

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var appChoice = process.argv[2];

function main() {
    switch (appChoice) {
        case "my-tweets":
            searchTweets();
            break;

        case "spotify-this-song":
            searchSpotify();
            break;

        case "movie-this":
            searchFlicks();
            break;

        case "do-what-it-says":
            readRandom();
            break;
    }
}

function searchTweets() {
    var params = {
        screen_name: 'sara06554646',
        count: 20
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log("The 20 most recent tweets");
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweet date: " + tweets[i].created_at);
                console.log(tweets[i].text)
                console.log("----------------------------------------------------------------------------")
            }
        }
    });
}


function searchSpotify() {

    var nodeArgs = process.argv;
    // var songName = "The Sign Ace of Base";
    var songName = "";
    if(!songName) {
        songName = "The Sign Ace of Base"
    }

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3) {
            songName = songName + "+" + nodeArgs[i];
        }

        else {
            songName = nodeArgs[i];
        }
        
    }
    spotify.search({ type: 'track', query: songName }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
       
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview song: " + data.tracks.items[0].preview_url);

    });
}

function searchFlicks() {

    var movieName = "Mr.+Nobody";

    var nodeArgs = process.argv;

    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3) {
            movieName = movieName + "+" + nodeArgs[i];
        }

        else {
            movieName = nodeArgs[i];
        }
    }

    console.log(movieName)


    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy"
    console.log(queryUrl);


    request(queryUrl, function (error, response, body) {

      
        if (!error && response.statusCode === 200) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release year: " + JSON.parse(body).Year);
            console.log("IMDB rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes rating: " + JSON.parse(body).Ratings[2].Value);
            console.log("Production country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}

function readRandom() {
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log(error);
        }
            
        var results = data.split(",");
        // searchSpotify(results);
        // searchSpotify(results)
       searchSpotify(results[0], results[1]);
      });
}

main();



//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

//      * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

//      * It's on Netflix!

//    * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

// 4. `node liri.js do-what-it-says`

//    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

//      * Feel free to change the text in that document to test out the feature for other commands.

// ### BONUS

// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.