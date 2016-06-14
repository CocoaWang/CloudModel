/**
 * Created by qiushan on 6/13/2016.
 */

/*
var io = require('socket.io-client');
var mySocket = io.connect("http://9.114.15.123:10002");

var globalBucket = [];
var containerName;
var containerImage;
var containerPort;
var buildDate;

function remoteInfo(res)
{
    mySocket.on("containers", function(message) {
        globalBucket.push(message);
        //console.log(globalBucket);

         //containerName = message["NAMES"];
         //containerImage = message["IMAGE"];
         //containerPort = message["PORTS"];
         //buildDate = message["CREATED"];

         //document.getElementById('zContainerService').innerHTML = '<li class="fh5co-include"> Service: hellomongodb</li>';
         //document.getElementById('zContainerName').innerHTML = '<li class="fh5co-include"> Name: '+containerName+'</li>';
         //document.getElementById('zContainerImage').innerHTML = '<li class="fh5co-include"> Image: '+containerImage+'</li>';
         //document.getElementById('zContainerPort').innerHTML = '<li class="fh5co-include"> Port: '+containerPort+'</li>';
         //document.getElementById('zContainerBuildDate').innerHTML = '<li class="fh5co-include"> Build Date: '+buildDate+'</li>';
         //document.getElementById('zContainerAccess').innerHTML = '<li class="fh5co-include"> you can access via: 54.223.168.107:8081</li>';

        res.render('order.html');
    });
}*/

var socket = require('socket.io-client')('http://9.114.15.123:10002');

socket.on('connect', function () {
    console.log("client connected.");
});

socket.on('connect_error', function(err){
    console.log(err);
});

socket.on('connect_timeout', function(){
    console.log("connect_timeout");
});

socket.on('reconnect_attempt', function(){
    console.log("reconnect_attempt");
});

socket.on('reconnecting', function(){
    console.log("reconnecting");
});

var transactionCntr = 0;

module.exports.get_processed_data = function(text, res) {
    var timestamp = new Date().getTime();
    var transactionId = transactionCntr++;
    console.log('sending data to client');

    function onResponse(data) {
        // for concurrency reasons, make sure this is the right
        // response.  The server must return the same
        // transactionId that it was sent
        //if (data.transactionId === transactionId) {
            //console.log('\tserverResponse' event trigged, data:');
            //res.send(data);
            console.log(data);
            res.render('order.html');
            socket.off('serverResponse', onResponse);
        //}
    }

    socket.on('serverResponse', onResponse);

    // send data and transactionId
    socket.emit('deploy', [timestamp ,text, transactionId], function (data) {
        console.log('\tSending query ... waiting for ACK');
        console.log(data);
    });
}