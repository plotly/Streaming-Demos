var Plotly = require('plotly')
  , config = require('./config.json')
  , plot_config = require('./plot_config.json');

// Enter your plotly credentials
var username = config.username;   // sign-up to plotly at https://plot.ly/ssu
var key = config.api_key;     // sign-in to plotly and view here: https://plot.ly/settings
var token = config.tokens[1]  // tokens can be viewed and generated in your settings, too
var filename = "twitter-stream-gif";

var lat = plot_config.map.lat
  , lon = plot_config.map.lon; 

var tweet_scatter = {
    name: 'Tweet!<br>Hover to view text'
  , x:[]
  , y:[]
  , text:[]
  , type:'scatter'
  , mode:'markers+text'
  , textposition: 'bottom'
  , marker: {'size': 16, 'opacity': 0.7}
  , stream: {
      token:token
    , maxpoints: 8
  }
};

var plotlyOptions = {
    filename: filename
  , fileopt: 'overwrite'
  , layout: {
        xaxis : {
            title: 'Time'
          , showgrid : false
          , zeroline : false
          , showline: false
          , ticks : ""
        },
        yaxis : {
            title: 'Happiness Ranking of Tweet (0 is unhappy, 10 is happy)'
          , showgrid : true
          , zeroline : false
          , showline: false
          , ticks : ""
        }
        , legend:{
            bgcolor:"rgba(255, 255, 255, 0)"
          , bordercolor:"rgba(255, 255, 255, 0)"
        }
      , showlegend: false
      , hovermode: "closest"
      , title: 'Real-Time Happiness of SF\'s Twittersphere'
      , annotations: [{
            text: 'The happiness of each tweet is computed with Dodds et al\'s happiness metric: <a href="http://arxiv.org/abs/1101.5120">http://arxiv.org/abs/1101.5120</a>'
          , xref: 'paper'
          , yref: 'paper'
          , x: -0.06
          , y: -0.141
          , showarrow: false
      }]
    }
  , world_readable: true
}

Plotly.plot([tweet_scatter], username, key, plotlyOptions)