var gpio = require('rpi-gpio');
var pin = 11; 
gpio.setup(pin, gpio.DIR_OUT, write);
 
function write() {
    gpio.write(pin, true, function(err) {
        if (err) throw err;
        console.log('Written to pin');
    });
}