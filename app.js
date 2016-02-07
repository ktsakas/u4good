var express = require('express');

var app = express();


app.use(express.static('./public'));


var server = app.listen((process.env.PORT || 3000), function() {
	var port = server.address().port;

	console.log('Development app running on http://localhost:%s', port);
});