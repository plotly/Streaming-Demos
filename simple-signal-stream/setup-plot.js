var Plotly = require('plotly')
  , config = require("./config.json") // put your user credentials in config.json
  , key = config['apikey']
  , user = config['user']
  , token = config['token']

// check for user data
if (!key || !user || !token) {
    console.log("  Please put the plot.ly/settings user credentials into the config.json file")
    process.exit()
}

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

// build you layout and file options
var layout = {
    "filename": "streamSimpleSensor"
  , "fileopt": "overwrite"
  , "layout": {
      "title": "streaming mock sensor data"
    , "width" : 600
    , "height": 400
  }
  , "world_readable": true
}


/*
 * Call plotly.plot to set the file up.
 * If you have included a streaming token
 * you should get a "All Streams Go!" message
 */
Plotly.plot(data, user, key, layout)
