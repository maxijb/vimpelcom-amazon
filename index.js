//Dependencies
var express = require('express');
var mongo = require('mongoose'); 
var pg = require('pg');

//URLs to connect to database (must be moved)
var database = {

	// the database url to connect
	mongo : 'mongodb://mbenedetto2:vimpel1@ec2-54-209-128-66.compute-1.amazonaws.com:27017/dummyDB',
	postgre: 'postgres://mbenedetto:vimpel11@vimpel.cyemgufihio8.us-east-1.rds.amazonaws.com:5432/vimpelcom_data'
};



// Connection to Mongo and creating Schema
mongo.connect(database.mongo, function(err) {
   if (err) console.error('Error conection to mongo:', err);
});

var mongoData = mongo.model('data', { first_name: String, last_name: String, age: Number, id: Number });



// Connection to PG

var client = new pg.Client(database.postgre);
client.connect(function(err) {
   if (err) console.error('Error conection to postgres:', err);
});


// Starting the application

var app = express();
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')


app.get('/', function(req, res){
		  res.send("MAXI");
});


/* Store data on Postgre */

app.get('/data', function(req, res) {
	var fname = req.query.first_name || "";
	var lname = req.query.last_name || "";
	var age = !isNaN(req.query.age) ? req.query.age : 0;

	if (fname || lname || age) {
		var str = "INSERT INTO data (first_name, last_name, age) VALUES ('"+fname+"', '"+lname+"', "+age+")";

		client.query(str, function(err, result) {
			if (err) {
				console.log(err, result);
				res.send("DB error:", err.error);
			} else {
				res.send("Success. Row created!!");
			}
		});
	} else {
		res.send("Some parameters are missing.")
	}
});


/* Show data on postgre */

app.get('/show', function(req, res) {
	client.query("SELECT * FROM data", function(err, results) {
		if (err) {
			console.log(err);
			res.send("DB error:", err.error);
		} else {
			res.send(results.rows);
		}
	});
});



app.get('/transfer', function(req, res) {
	client.query("SELECT * FROM data", function(err, results) {
		if (err) {
			console.log(err);
			res.send("DB error:", err.error);
		} else {
			mongoData.collection.insert(results.rows)
			.then(function(errMongo, resultsMongo) {
				if (errMongo) console.log('errormongo', errMongo);
				res.send("se han incluido:" + JSON.stringify(results.rows));
			});
		}
	});
});


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



// Starting the server

app.listen(8080, function() {
		  console.log('Listening on port 8080...')
});
