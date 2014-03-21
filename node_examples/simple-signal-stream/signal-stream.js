var Plotly = require('plotly')
  , config = require("./config.json") // put your user credentials in config.json
  , key = config['apikey']
  , user = config['user']
  , token = config['token']


// build a data object - see https://plot.ly/api/rest/docs for information
var data = {
    'x':[]   // empty arrays since we will be streaming our data to into these arrays
  , 'y':[]
  , 'type':'scatter'
  , 'mode':'lines+markers'
  , marker: {
      color: "rgba(31, 119, 180, 0.96)"
  }
  , line: {
      color:"rgba(31, 119, 180, 0.31)"
  }
  , stream: {
      "token": token
    , "maxpoints": 100
  }
}

// build your layout and file options
var layout = {
    "filename": "streamSimpleSensor"
  , "fileopt": "overwrite"
  , "layout": {
      "title": "streaming mock sensor data"
  }
  , "world_readable": true
}


/*
 * random signal stream options
 * Plotly only accepts stringified newline seperated JSON
 * so the separator is very important
 */
var sigOpts = {sep: "\n", tdelta: 100}

var signalstream = Signal(sigOpts)
var plotly = hyperquest(httpOpts)

plotly.on("error", function (err) {
    signalstream.destroy()
    console.log(err)
})

// Okay - stream to our plot!
signalstream.pipe(plotly)
