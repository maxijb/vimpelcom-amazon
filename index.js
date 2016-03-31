var express = require('express');
var mongoose = require('mongoose'); 
var database = {

	// the database url to connect
	url : 'mongodb://mbenedetto:vimpel1@ec2-54-209-128-66.compute-1.amazonaws.com:27017/dummyDB'
};


mongoose.connect(database.url);

var app = express();
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')


app.get('/', function(req, res){
		  res.send("MAXI");
		});


app.listen(8080, function() {
		  console.log('Listening on port 8080...')
		});
