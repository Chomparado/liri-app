var client = require('./keys.js');
var client = JSON.stringify(client);
	client = JSON.parse(client);
var Twitter = require('twitter');
var clientInfo = new Twitter(client);

// ==================================================================================================

var argument = process.argv[2];
var movieOrSong = process.argv[3];

// ==================================================================================================
if (argument === 'my-tweets'){
			var params = {screen_name: 'chris_liri'};
			clientInfo.get('statuses/user_timeline', params, function(error, tweets, response){
			  if (!error) {
			  	for(i=0; i<20; i++){
			   		 console.log(tweets[i].text);
					}
			  }else{
			  	console.log(error);
			  }
			});	
}

// ==================================================================================================

else if (argument === 'spotify-this-song'){

function spotify(movieOrSong){
		var spotify = require('spotify');

		if (process.argv[3] == null){
			movieOrSong = "in too deep"
		}

		 
		spotify.search({ type: 'track', query: movieOrSong }, function(err, data) {
		    if ( err ) {
		        console.log('Error occurred: ' + err);
		        return;
		    }
		 
		  	var capture = data.tracks.items[0];
		  	var	artist = capture.artists[0].name;
		  	var songname = capture.name;
		  	var preview = capture.external_urls.spotify;
		  	var album = capture.album.name;

		  	// console.log(capture);
		  	console.log('Artist: '+artist);
		  	console.log('Name of Song: '+songname);
		  	console.log('Preview: '+preview);
		  	console.log('Album: '+album);

		});
}

spotify();

}

// THIS WORKS PERFECTLY NO MORE WORK==============================================================

else if (argument === 'movie-this'){
		var omdb = require('omdb');
		if (process.argv[3] == null){
			movieOrSong = "Pokemon"
		};

		omdb.search(movieOrSong, function(err, movies) {
		    if(err) {
		        return console.error(err);
		    }
		 
		    if(movies.length < 1) {
		        return console.log('No movies were found!');
		    }

			var userMovie = movies[0].title;
			var userYear = movies[0].year;
		 
		omdb.get({ title: userMovie, year: userYear }, true, function(err, movie) {

			var movieTitle = movie.title;
			var movieYear = movie.year;
			var movieRating = movie.imdb.rating;
			var movieCountries = movie.countries;
			var moviePlot = movie.plot;
			var movieActors = movie.actors;
			var movieRotten = movie.rotten;


		    if(err) {
		        return console.error(err);
		    }
		 
		    if(!movie) {
		        return console.log('Movie not found!');
		    }
		 
		    console.log('Title: '+movieTitle);
		    console.log('Year: '+movieYear);
		    console.log('Rating: '+movieRating);
		    console.log('Countries: '+movieCountries);
		    console.log('Plot: '+moviePlot);
		    console.log('Actors: '+movieActors);
		    console.log('Rotten Tomatoes Rating: '+movieRotten);
		 

		});
		});
	}
// ==============================================================================================================

