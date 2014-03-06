var exec = require('child_process').exec;

var tempId = '28-00000436cecd';

exports.read_value = function (value_reporter) {

  console.log("tempId: " + tempId);
  exec( "cat /sys/bus/w1/devices/" + tempId + "/w1_slave | grep t= | cut -f2 -d= | awk '{print $1/1000}'", function( error, stdout, stderr ){

    var tempC = parseFloat(stdout);
    var tempF = ((1.8)*tempC + 32).toFixed(2);
    
    var adate = new Date();
    var time = adate.getTime();
    
    var data = '{ "id" : "liquidTemp", "Time" : ' + time + ', "Fahrenheit" : "' + tempF + '", "Celcius" : "' + tempC + '" }';
    
    console.log(data);
    
    return value_reporter(data);
    
  });
}
