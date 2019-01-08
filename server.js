//Setting up the local server...
const http = require('http');
const fs = require('fs');
const hostname = '127.0.0.1';
const port = 3000;

fs.readFile('myPage.html', (err, html) => {
	if(err) {
		console.log(err);
	}

	const server = http.createServer((req, res) => {
		res.statusCode = 200;
		res.setHeader('Content-type', 'text/html');
		res.write(html);
		res.end();
	});

	server.listen(port, hostname, () => {
		console.log('Server started on port ' + port);
		});

});

// var express = require('express');
// var app = express();
// app.set('port', 3000);

// var server = app.listen(app.get('port'), function() {
// 	var port = server.address().port;
// 	console.log('magic happens on port ' + port);
// });