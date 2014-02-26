var hyperquest = require('hyperquest')
  , token = require("../config_bp.json")["token"]
  , Signal = require("random-signal")

var options =  {
    method: 'POST'
  , uri: "http://stream.plot.ly/"
  , headers: {
      "connection": "keepalive"
    , "plotly-streamtoken": token
  }
}

// options for our random signal stream
var sigopts = {
    sep: "\n"     // seperator
  , tdelta: 50    // milliseconds
  , hz: 0.5       // 1/sec
  , noiseHz: 1    // 1/sec
}

var sigstream = Signal(sigopts)

var req = hyperquest(options)


/*
 * BIG NOTE!
 * We are streaming newline separated stringified JSON!
 * '{"x": 2, "y": 3}\n'
 */
sigstream.pipe(req)