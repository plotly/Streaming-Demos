var hyperquest = require('hyperquest')
  // , stream_token = require('../config.json').simpleStreamToken // ADD YOUR STREAM TOKEN HERE

var token1 = "rso0jwpmfg";
var token2 = "kydr0ia5tj";

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
    req1.write(JSON.stringify({x: x, y: x})+ "\n")    
//    req1.write(JSON.stringify({x: x, y: signal(x)})+ "\n")
//    req2.write(JSON.stringify({x: x, y: -signal(x)})+ "\n")
}, 50)

function signal (x) {
    return Math.tan(Math.sin(x)
                   + 0.2*Math.sin(x/3)
                   + 0.3*Math.cos(5*x))
}