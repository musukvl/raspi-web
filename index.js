var express = require('express');
var app = express();
var gpio = require('rpi-gpio');

app
  .get('/', function (req, res) {
    res.send('Hello World!');
  })
  .get('/on',function(req, res){
        var pin = 11; 
	gpio.setup(pin, gpio.DIR_OUT, write);
 
	function write() {
	    gpio.write(pin, true, function(err) {
            if (err) throw err;
           console.log('Written to pin');
       	 });
        }	      
  })
  .get('/off',function(req, res){
        var pin = 11; 
	gpio.setup(pin, gpio.DIR_OUT, write);
 
	function write() {
	    gpio.write(pin, true, function(err) {
            if (err) throw err;
           console.log('Written to pin');
       	 });
        }	      
  })
;

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
