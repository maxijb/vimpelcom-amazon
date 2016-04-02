var constants = require('./constants');

module.exports = function initRoutes(app, pg, mongo) {
	
	//Middleware enriching the res object
	//with data useful to be rendered on every request
	app.use(function(req, res, next) {
		res.context = {
			action: req.path.substr(1),
			options: constants.options
		};

		next();
	});


	//Index page
	app.get('/', function(req, res){
		successResponse.call(res);
	});


	//Static get response for /data form
	app.get('/data', function(req, res) {
		successResponse.call(res);
	});

	/* Store data on Postgre */
	app.post('/data', function(req, res) {
		//normalize params		
		var fname = req.body.first_name || "",
			lname = req.body.last_name || "",
			age = !isNaN(req.body.age) ? req.body.age : 0;

		pg.saveItem(fname, lname, age)
			.then(successResponse.bind(res, true))
			.catch(errorResponse.bind(res));
	});


	/* Show data on postgre */
	app.get('/show', function(req, res) {
		pg.getAllData()
			.then(successResponse.bind(res))
			.catch(errorResponse.bind(res));  
	});


	/* Transfer all data from PG to mongo */ 
	app.get('/transfer', function(req, res) {
		pg.getAllData()
			.then(function(results) {
				return Promise.all([
							mongo.saveAllData(results),
							pg.deleteAllData()
						]);
			})
			.then(successResponse.bind(res))
			.catch(errorResponse.bind(res));
	});


	/* Show all data store on mongo */
	app.get('/check', function(req, res){
		mongo
			.getAllData()
			.then(successResponse.bind(res))
			.catch(errorResponse.bind(res));
	});


	/* Reset both databases: mongo and PG */
	app.get('/shutdown', function(req, res) {
		//delete everything
		Promise.all([pg.deleteAllData(), mongo.deleteAllData()])
			.then(function() {
				//restart serial id
				return pg.restartIDs();
			})
			.then(successResponse.bind(res))
			.catch(errorResponse.bind(res));
	});
}



/* ------------- Private helpers ---------- */

function errorResponse(err) {
	console.error(err);
	this.send({status: "error", reason: err});
}

function successResponse(data) {
	this.render(this.context.action, {context: this.context, status: "ok", data: data});
}