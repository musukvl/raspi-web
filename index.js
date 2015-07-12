var express = require('express');
var app = express();
var gpio = require('rpi-gpio');

var pin = 11;

app
  .get('/', function (req, res) {
    read(pin, function (value) {
      var result = '<p>Led is ';
      if (value) {
        result += 'ON.</p> You can turn it <a href="/off">OFF</a>';
      } else {
        result += 'OFF.</p> You can turn it <a href="/on">ON</a>';
      }
      res.send(result);
    });
  })
  .get('/on', function (req, res) {
    write(pin, true, function () {
      res.redirect('/');
    });
  })
  .get('/off', function (req, res) {
    write(pin, false, function () {
      res.redirect('/');
    });
  });

function read(pin, callback) {  
    gpio.read(pin, function (err, value) {
	  if (err) throw err;
      console.log('Read from pin ' + pin + " value = " + value);	  
      if (callback) callback(value);
    });  
}

function write(pin, value, callback) {  
    gpio.write(pin, value, function (err) {
      if (err) throw err;
      console.log('Written to pin ' + pin + " value = " + value);
	  if (callback) callback();
    });  
}

function initGpio(callback) {
  gpio.setup(pin, gpio.DIR_OUT, function () {
	if (callback) callback(); 
  });
}


function runServer(callback) {
	var server = app.listen(80, function () {
		var host = server.address().address;
		var port = server.address().port;
		console.log('App listening at http://%s:%s', host, port);
		if (callback) callback();
	});
}

initGpio(function(){
	runServer();
});
