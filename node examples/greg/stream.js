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
   req1.write(JSON.stringify({x: x, y: liquidTempValue()})+ "\n")
   req2.write(JSON.stringify({x: x, y: airTempValue()})+ "\n")
}, 2000)



function liquidTempValue() {
  
  var liquidTmp = liquidTemp.read_value( function(datastr){
      liquidTemp = JSON.parse(datastr);
      return liquidTemp.Farhenheit;
  });

  console.log("LIQUID TMP: ", liquidTmp);

  return liquidTmp;

}

function airTempValue() {
   
  var airTmp = humi2c.read_value( function(datastr2){
      humidityi2c = JSON.parse(datastr2);
      return humidityi2c.Farhenheit;
  });

  console.log("AIR TMP: ", airTmp);

  return airTmp;
}

 

        






