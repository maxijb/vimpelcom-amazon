var express = require('express');

var app = express();
app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')


app.get('/', function(req, res){
		  res.send("MAXI");
		});


app.listen(8080, function() {
		  console.log('Listening on port 8080...')
		});
