var Twit = require('twit')
  , hyperquest = require('hyperquest')
  , config = require('../config.json')
  , plot_config = require('./plot_config.json')
  , T = new Twit({
    consumer_key: config.consumer_key
  , consumer_secret: config.consumer_secret
  , access_token: config.access_token
  , access_token_secret: config.access_token_secret
  })

var histogram2d_token = config.tokens[1];
var scatter_token = config.tokens[2];

//
// filter the public stream by the latitude/longitude bounded box of San Francisco
//
var lat = plot_config.map.lat
  , lon = plot_config.map.lon;
var sanFrancisco = [ lon[0],lat[0], lon[1],lat[1] ]

// initialize twitter and plotly streams
var twitterStream = T.stream('statuses/filter', { locations: sanFrancisco })
function plotlystream(token){
  var httpOpts = {
      method: 'POST'
    , uri: 'http://stream.plot.ly'
    , headers: {
        'plotly-streamtoken': token
    }
  }
  return hyperquest(httpOpts);
}
var scatterStream = plotlystream(scatter_token);
var histogramStream = plotlystream(histogram2d_token);

// plot the incoming tweets
twitterStream.on('tweet', function (tweet) {
  // check if location info is included in tweet
  var location = (location = tweet.geo) && (location = location.coordinates)
  if (!location) { console.log('tweet!'); return }
  console.log('tweet with location!: ', location[1], ' ,', location[0]);

  // define scatter and histogram points and ship to plotly
  var scatter_point = {'x': location[1], 'y': location[0], 'text': tweet.text}
  var hist2d_point = {'x': location[1], 'y': location[0]}
  scatterStream.write(JSON.stringify(scatter_point)+'\n')
  histogramStream.write(JSON.stringify(hist2d_point)+'\n')
})