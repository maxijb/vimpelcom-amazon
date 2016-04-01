var express = require('express');
var mongoose = require('mongoose'); 
var pg = require('pg');
var database = {

	// the database url to connect
	url : 'mongodb://mbenedetto:vimpel1@ec2-54-209-128-66.compute-1.amazonaws.com:27017/dummyDB',
	postgre: 'postgres://mbenedetto:vimpel11@vimpel.cyemgufihio8.us-east-1.rds.amazonaws.com:5432/vimpelcom_data'
};


mongoose.connect(database.url);

var client = new pg.Client(database.postgre);
client.connect();


var app = express();
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')


app.get('/', function(req, res){
		  res.send("MAXI");
});

var Cat = mongoose.model('Cat', { name: String });


app.get('/mongo', function(req, res){

	console.log('llega');
	var kitty = new Cat({ name: 'Zildjian' });
	console.log('guarda');
	kitty.save(function (err) {
		console.log('callback', arguments);
	  if (err) {
	    res.send("error"+err);
	  } else {
	    res.send('meow');
	  }
	});

});


app.listen(8080, function() {
		  console.log('Listening on port 8080...')
		});
