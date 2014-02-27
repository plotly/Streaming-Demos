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

/*
 * random signal stream options
 * Plotly only accepts stringified newline seperated JSON
 * so the separator is very important
 */
var sigOpts = {sep: "\n", tdelta: 100}

var signalstream = Signal(sigOpts)
var plotlystream = hyperquest(httpOpts)

// Okay - stream to our plot!
signalstream.pipe(plotlystream)

plotlystream.on("error", function (err) {
    signalstream.destroy()
    console.log(err)
})