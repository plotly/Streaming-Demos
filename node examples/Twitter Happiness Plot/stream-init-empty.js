var Plotly = require('plotly')
  , config = require('../config.json')
  , plot_config = require('./plot_config.json');

// Enter your plotly credentials
var username = config.username;   // sign-up to plotly at https://plot.ly/ssu
var key = config.api_key;     // sign-in to plotly and view here: https://plot.ly/settings
var histogram2d_token = config.tokens[1]  // tokens can be viewed and generated in your settings, too
var scatter_token = config.tokens[2];
var filename = "twitter-map";

var lat = plot_config.map.lat
  , lon = plot_config.map.lon

var histogram2d = {
    x: [lon[0]]
  , y: [lat[0]]
  , type: 'histogram2d'
  , opacity:0.4
  , zsmooth:"fast"
  , autobinx: "true"
  , autobiny: "true"
  , zauto: "true"
  , showlegend: false
  , stream: {
        token: histogram2d_token
      , maxpoints: 10000
  }
};

var scatter = {
    name: 'tweet!'
  , x:[]
  , y:[]
  , text:[]
  , type:'scatter'
  , mode:'markers'
  , marker: {'size': 20, 'opacity': 0.7}
  , stream: {
      token:scatter_token
    , maxpoints: 50
  }
};

var plotlyOptions = {
    filename: filename
  , fileopt: 'overwrite'
  , layout: {
        xaxis : {
            title: 'longitude'
          , autotick : true
          , showgrid : false
          , zeroline : false
          , ticks : ""
        },
        yaxis : {
            title: 'latitude'
          , autotick : true
          , showgrid : false
          , zeroline : false
          , ticks : ""
        }
        , legend:{
            bgcolor:"rgba(255, 255, 255, 0)"
          , bordercolor:"rgba(255, 255, 255, 0)"
        }
      , title: "SF twitter-map"
      , margin: { 
                    t:80
                  , b:80
                  , r:80
                  , l:80
                  , pad:0
                }
    }
  , world_readable: true
}


Plotly.plot([scatter, histogram2d], username, key, plotlyOptions)