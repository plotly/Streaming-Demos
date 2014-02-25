var hyperquest = require('hyperquest')
  // , stream_token = require('../config.json').simpleStreamToken // ADD YOUR STREAM TOKEN HERE

var options =  {
    method: 'POST'
  , uri: "http://ec2-23-22-11-102.compute-1.amazonaws.com:10101"
  , port: 10101
  , headers: {
      "connection": "keepalive"
    , "plotly-streamtoken": ""//stream_token
  }
}

var req = hyperquest(options)


var x = 0

setInterval( function () {
    x += 0.05
    req.write(JSON.stringify({x: x, y: signal(x)})+ "\n")
}, 50)

function signal (x) {
    return Math.tan(Math.sin(x)
                   + 0.2*Math.sin(x/3)
                   + 0.3*Math.cos(5*x))
}

// var x0 = 0
//   , nx = 500
//   , xt = 2*Math.PI
//   , dx = xt/(nx-1)
//   , x = []

// while (x0 <= xt) {
//     x.push(x0)
//     x0 += dx
// }
