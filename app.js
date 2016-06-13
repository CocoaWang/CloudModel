/*******************************************************************************
* Qiushan
* 4/1/2016
*******************************************************************************/

var express = require('express')
  , fs = require('fs');

var io = require('socket.io-client');
var mySocket = io.connect("http://9.114.15.123:10002");

var globalBucket = [];
var containerName;
var containerImage;
var containerPort;
var buildDate;

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

	var text = 'mongodb';
	mySocket.emit('deploy', text);

	remoteInfo(res);

	//res.render('order.html');
	//res.render('order.html', {service_name:req.query.service_name, image_name:req.query.image_name,
	//							memory_setting:req.query.memory_setting, link_to:req.query.link_to});
});
app.get('/order.html', function(req, res) {
    //res.send('LinuxONE CaaS');
    res.render('order.html');
});

app.get('/square', function(req, res) {
	res.render('square', {entries:imagesEngine.getImagesEntries()});
});

app.get('/deploy_setting', function(req, res) {
	console.log(req.query.id);
	console.log(req.query.name);
	res.render('deploy_setting', {id:req.query.id, name:req.query.name});
});


function startServer() {
	if (serverStarted ) return;
	serverStarted = true;
	app.listen(port);   
	console.log("Express server listening on port " + port);
}

function remoteInfo(res)
{
	mySocket.on("containers", function(message) {
		globalBucket.push(message);
		//console.log(globalBucket);
		/*
		containerName = message["NAMES"];
		containerImage = message["IMAGE"];
		containerPort = message["PORTS"];
		buildDate = message["CREATED"];

		document.getElementById('zContainerService').innerHTML = '<li class="fh5co-include"> Service: hellomongodb</li>';
		document.getElementById('zContainerName').innerHTML = '<li class="fh5co-include"> Name: '+containerName+'</li>';
		document.getElementById('zContainerImage').innerHTML = '<li class="fh5co-include"> Image: '+containerImage+'</li>';
		document.getElementById('zContainerPort').innerHTML = '<li class="fh5co-include"> Port: '+containerPort+'</li>';
		document.getElementById('zContainerBuildDate').innerHTML = '<li class="fh5co-include"> Build Date: '+buildDate+'</li>';
		document.getElementById('zContainerAccess').innerHTML = '<li class="fh5co-include"> you can access via: 54.223.168.107:8081</li>';
		*/
		res.render('order.html');
	});
}

startServer();