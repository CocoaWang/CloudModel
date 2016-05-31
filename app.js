/*******************************************************************************
* Qiushan
* 4/1/2016
*******************************************************************************/

var express = require('express')
  , fs = require('fs');
var settings = JSON.parse(fs.readFileSync('settings.json', 'utf8'));

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var bodyParser = require('body-parser');

// disable process.env.PORT for now as it cause problem on mesos slave
var port = (process.env.VMC_APP_PORT || process.env.VCAP_APP_PORT || settings.port);
var host = (process.env.VCAP_APP_HOST || 'localhost');


var serverStarted = false;

var app = express();

// 加载hbs模块
var hbs = require('hbs');
var imagesEngine = require('./images');

app.use(express.static(__dirname + '/public'));     	// set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('view engine', 'html');
// 运行hbs模块
app.engine('html', hbs.__express);
//app.engine('.html', require('ejs').renderFile);
app.post('/order', multipartMiddleware, function(req, res) {
	console.log(req.body);
	res.render('order.html');
});
app.get('/order.html', function(req, res) {
    //res.send('LinuxONE CaaS');
    res.render('order.html');
});

app.get('/square', function(req, res) {
	//res.send('LinuxONE CaaS');
	res.render('square', {entries:imagesEngine.getImagesEntries()});
});

function startServer() {
	if (serverStarted ) return;
	serverStarted = true;
	app.listen(port);   
	console.log("Express server listening on port " + port);
}

startServer();