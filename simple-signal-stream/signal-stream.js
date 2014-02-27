var hyperquest = require('hyperquest') // this is a stream friendly http request module from Substack
  , config = require("./config.json")  // put your user credentials in config.json
  , Signal = require("random-signal")  // This module produces random signal data
  , token = config["token"]


// check for tokens
if (!token) {
    console.log("  Please put the plot.ly/settings streaming token into the config.json file")
    process.exit()
}

// hyperquest options
var httpOpts =  {
    method: 'POST'
  , uri: "http://stream.plot.ly/"
  , headers: {
      "plotly-streamtoken": token
  }
}

// random signal stream options
var sigOpts = {sep: "\n"}

var signalstream = Signal(sigOpts)
var plotlystream = hyperquest(httpOpts)


/*
 * BIG NOTE!
 * We are streaming newline separated stringified JSON!
 * '{"x": 2, "y": 3}\n'
 */
signalstream.pipe(plotlystream)