var hyperquest = require('hyperquest')
  // , stream_token = require('../config.json').simpleStreamToken // ADD YOUR STREAM TOKEN HERE

var sensors_map = { "liquidTemp" : "none", "humidityi2c" : "none"};
var liquidTemp = require('./sensors/temp');
var humi2c = require('./sensors/humi2c')

var token1 = "g9ngw7qyyy";
var token2 = "begbqoc59p";

function options(token) {
  return {
    method: 'POST'
  , uri: "http://stream.plot.ly"
  , port: 10101
  , headers: {
      "connection": "keepalive"
    , "plotly-streamtoken": token//stream_token
    }
  }
}

var req1 = hyperquest(options(token1));
var req2 = hyperquest(options(token2));


var exec = require('child_process').exec;

var tempId = '28-00000436cecd';
setInterval(function(){ 

  exec( "cat /sys/bus/w1/devices/" + tempId + "/w1_slave | grep t= | cut -f2 -d= | awk '{print $1/1000}'", function( error, stdout, stderr ){
    //stdout = 50;
    var tempC = parseFloat(stdout);
    var tempF = ((1.8)*tempC + 32).toFixed(2);
    
    var adate = new Date();
    var time = adate.getTime();
    
    //var data = '{ "id" : "liquidTemp", "Time" : ' + time + ', "Fahrenheit" : "' + tempF + '", "Celcius" : "' + tempC + '" }';

    var data1 = JSON.stringify({x: Date.now(), y: tempC})+ "\n";
    var data2 = JSON.stringify({x: Date.now(), y: tempF})+ "\n";
    console.log(data1, '\n', data2);
     req1.write(data1);
     req2.write(data2);
  });
}, 2000);

        






