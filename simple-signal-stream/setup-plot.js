var Plotly = require('plotly')
  , config = require("../config_bp.json")
  , key = config['api-key'] // put your API KEY here
  , user = config['user']   // put your user name here
  , token = config['token'] // put your stream token here

// build a data object
var data = {
    'x':[]   // empty arrays since we will stream our data to them
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
