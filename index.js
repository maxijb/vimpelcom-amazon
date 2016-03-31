var express = require('express');
var mongoose = require('mongoose'); 
var database = {

	// the database url to connect
	url : 'mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'
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
