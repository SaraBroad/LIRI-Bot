require("dotenv").config();
// //*require any node packages that I installed

var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require('request');
var keys = require('./keys.js');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter) ({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

console.log("Hello");

function main(appChoice, userSelection){
    switch (appChoice) {
    case "my-tweets":
    searchTweets();
    break;    

    case "spotify-this-song":
    searchSpotify(userSelection);
    break;

    case "movie-this":
    searchFlicks(userSelection);
    break;

    case "do-what-it-says":
    }
} 

function searchTweets() {
        var params = {screen_name: 'nodejs',
                      count:20};
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
            console.log("The 20 most recent tweets");
            for (var i = 0; i < tweets.length; i++) {
                console.log("Tweet date: " + tweet[i].created_at);
                console.log(tweets[i].text)
                console.log("------------------------------------")
            }
        }
});
}


function searchSpotify(songName) {
    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else if (songName) {
      //if song name is chosen 
      console.log("artist");
      console.log("song name");
      console.log("link preview");
      console.log("album") 
        } else {
            //song name is "The Sign" by Ace of Base
        }
      });
}

function searchFlicks(movieName) {

}

main(process.argv[2], process.argv[3]);


// 3. `node liri.js movie-this '<movie name here>'`

//    * This will output the following information to your terminal/bash window:

//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```

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