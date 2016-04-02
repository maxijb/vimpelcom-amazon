//Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); 
var pgp = require('pg-promise')();
var initRoutes = require('./app/routes');
var mongoModel = require('./app/mongoModel');
var pgModel = require('./app/pgModel');

//URLs to connect to database 
var database = require('./keys/databases');


// Start connection to databases and start server later
Promise
	.all([mongoose.connect(database.mongo), pgp(database.postgre).connect()])
	.then(startServer)
	.catch(function(reason) {
		console.error("Server has not started because:", reason);
	});



function startServer(databases) {
	var app = express();

	app
		//configure views
		.engine('jade', require('jade').__express)
		.set('view engine', 'jade')
		//configure assets
		.use('/static', express.static(__dirname + '/assets'))
		//configure POST reqs
		.use(bodyParser.urlencoded({
	 		 extended: true
		}))
		.use(bodyParser.json())
		//start server and on callback init routes
		.listen(8080, function() {
		  
		  console.log('Listening on port 8080...')
		  
		  //sending app, pg, and mongo
		  initRoutes(app, pgModel(databases[1]), mongoModel(mongoose));
		});

} 


