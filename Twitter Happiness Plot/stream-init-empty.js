var request = require('request');
var querystring = require('querystring');
var net = require('net');
var config = require('../config.json');
var plot_config = require('../plot_config.json');

var key = config.api_key;
var user = "Urban-Data-Challenge";
var host = "http://ec2-23-22-11-102.compute-1.amazonaws.com";
var port = 10101;
var hm_token = config.chris_token_1;
var scatter_token = config.chris_token_2;
var filename = "coordinate-calibration";

var n_cells = plot_config.heatmap.n_cells
  , hm_x = []
  , hm_y = []
  , lat = plot_config.map.lat
  , lon = plot_config.map.lon;
for(var i=0; i<n_cells+1; i++){ hm_x.push( lon[0] + i*(lon[1] - lon[0])/(n_cells)  ); }
for(var i=0; i<n_cells+1; i++){ hm_y.push( lat[0] + i*(lat[1] - lat[0])/(n_cells)  ); }

var z, zi, i, j; 
var k=1;
z = [];
for(i=0; i<n_cells; i++){
  zi = [];
  for(j=0; j<n_cells; j++){
    zi.push(j*k);
  }
  z.push(zi);
}
/*

*/
var hm = {
    'z': z
  , 'x': hm_x
  , 'y': hm_y
  , 'type': 'heatmap'
  , 'scl': [[0,"rgb(33, 102, 172)"],[0.125,"rgb(67, 147, 195)"],[0.25,"rgb(146, 197, 222)"],[0.375,"rgb(209, 229, 240)"],[0.5,"rgb(247, 247, 247)"],[0.625,"rgb(253, 219, 199)"],[0.75,"rgb(244, 165, 130)"],[0.875,"rgb(214, 96, 77)"],[1,"rgb(178, 24, 43)"]]
  , 'showscale': false
  , 'opacity':0.4
  , 'zsmooth':"fast"
  , 'stream': {
      'token': hm_token,
      'maxpoints': 1
  }
};

var scatter = {
    'x':[]
  , 'y':[]
  , 'text':[]
  , 'type':'scatter'
  , 'mode':'markers'
  , 'marker': {'size': 20, 'opacity': 0.7}
  , 'stream': {
    "token":scatter_token
  , "maxpoints": 500
  }
};

var calibration = {
    'x': [-122.50774, -122.47572, -122.38766]
  , 'y': [37.72125, 37.80484, 37.78911]
  , 'text': ['Tip of Lake Merced', 'Golden Gate Bridge', 'Bay Bridge']
  , 'marker': {'size': 20, 'symbol': 'diamond'}
  , 'mode': 'markers'
}

var query = {
    "un": user
  , "key": key
  , "origin": "plot"
  , "platform": "node"
  , "args": JSON.stringify([hm, calibration, scatter])
  , "kwargs": JSON.stringify({
     "filename": filename
   , "fileopt": "overwrite"
   , "layout": {
       "xaxis" : {
           "range" : lon,
           "autotick" : true,
           "showgrid" : false,
           /*"showline" : false,*/
           /* "showticklabels" : false, */
           "zeroline" : false,
           "ticks" : "",
           "tickfont": {
            "size":12,
            "color":"white"
           }           
       },
       "yaxis" : {
           "range" : lat,
           "autotick" : true,
           "showgrid" : false,
           /*"showline" : false,*/
           /*"showticklabels" : false,*/
           "zeroline" : false,
           "ticks" : "",
           "tickfont": {
            "size":12,
            "color":"white"
           }

       },
       "title": "tributary"
      , "margin": { 't':0,
                    'b':50,
                    'r':0,
                    'l':50,
                    'pad':0}
      , "width" : 750
      , "height": 950
      , "plot_bgcolor": "rgba(255,255,255,0)"
      , "paper_bgcolor": "rgba(255,255,255,0)"
      , "bgimg": "http://www.thecitrusreport.com/wp-content/uploads/2010/05/san-francisco-on-a-sheet-blue.png"
    }
    , "world_readable": true
  })
};


request(
    {
        method: 'POST'
      , uri: 'https://plot.ly/clientresp'//'http://ec2-54-196-84-85.compute-1.amazonaws.com/clientresp'
      , body:  querystring.stringify(query)
    }
  , function (err, res) {

        if(res.statusCode == 200){
            var payload = JSON.parse(res.body);
            console.log(payload);
        }

        else {
            console.log('error: '+ err, 'status', res.statusCode);
        }

    }

);
