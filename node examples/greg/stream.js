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

var x = 0

setInterval( function () {
    x += 0.05
    // req1.write(JSON.stringify({x: x, y: x})+ "\n")    
   req1.write(JSON.stringify({x: x, y: liquidTempValue(x)})+ "\n")
   req2.write(JSON.stringify({x: x, y: airTempValue(x)})+ "\n")
}, 50)



function liquidTempValue(x) {
   
  return liquidTemp.read_value( function(datastr){
      sensors_map.liquidTemp = JSON.parse(datastr);
      return sensors_map.liquidTemp.Farhenheit;
  });

}

function airTempValue(x) {
   
  return humi2c.read_value( function(datastr2){
      sensors_map.humidityi2c = JSON.parse(datastr2);
      return sensors_map.humidityi2c.Farhenheit
  });

}

 

        






