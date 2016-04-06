/*******************************************************************************
* Qiushan
* 4/1/2016
*******************************************************************************/

var express = require('express')
  , fs = require('fs');
var settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));



// disable process.env.PORT for now as it cause problem on mesos slave
var port = (process.env.VMC_APP_PORT || process.env.VCAP_APP_PORT || settings.port);
var host = (process.env.VCAP_APP_HOST || 'localhost');


var serverStarted = false;

var app = express();
app.use(express.static(__dirname + '/public'));     	// set the static files location /public/img will be /img for users
/*
app.get('/', function(req, res) {
	res.send('LinuxONE CaaS');
});
*/
function startServer() {
	if (serverStarted ) return;
	serverStarted = true;
	app.listen(port);   
	console.log("Express server listening on port " + port);
}

startServer();