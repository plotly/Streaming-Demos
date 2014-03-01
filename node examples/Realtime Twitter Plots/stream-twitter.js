var Twit = require('twit')
  , hyperquest = require('hyperquest')
  , config = require('./config.json')
  , plot_config = require('./plot_config.json')
  , T = new Twit({
    consumer_key: config.twitter_consumer_key
  , consumer_secret: config.twitter_consumer_secret
  , access_token: config.twitter_access_token
  , access_token_secret: config.twitter_access_token_secret
  })
  , csv = require('csv')
  , request = require('request')
  , token = config.tokens[1];

//
// grab the happiness ranking data from a CSV on github 
//
var url = "https://gist.githubusercontent.com/chriddyp/9259984/raw/1bdef1e00dd14ba4adc235b231574eecbbaead40/Happiness+Ranking"
var happiness_lookup = {}
csv()
  .from
  .stream(request(url), {columns: true})
  .transform(function (row, i) {  
    happiness_lookup[row.word] = row.happiness_average;
  }).on("end", function () {

    //
    // filter the public stream by the latitude/longitude bounded box of San Francisco
    //
    var lat = plot_config.map.lat
      , lon = plot_config.map.lon;
    var sanFrancisco = [ lon[0],lat[0], lon[1],lat[1] ]

    //
    // initialize twitter and plotly streams
    //
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
    var plotlyScatterPlotStream = plotlystream(token);

    // plot the incoming tweets
    var k = 0
      , ranking = 0;
    twitterStream.on('tweet', function (tweet) {
      console.log('tweet!');
      // Compute the happiness ranking - the average of the ratings
      k = 0
      ranking = 0
      tweet.text.split(' ').forEach(function(word){
        if( word in happiness_lookup ){
          ranking += parseFloat(happiness_lookup[word]);
          k++;
        }
      })
      if(k===0){ return }
      ranking = ranking / k;

      // insert new lines into the tweet every 5 words
      var lines = []
      var words = tweet.text.split(' ')
      while(words.length>0) lines.push( words.splice(0, 5).join(' ') );
      var tweet_text = lines.join('<br>')

      // define scatter points and ship to plotly
      var x = getTimeString(new Date())
      var y = ranking
      var scatter_point = {'x': x, 'y': y, 'text': tweet_text}
      console.log(scatter_point);
      plotlyScatterPlotStream.write(JSON.stringify(scatter_point)+'\n')
    })
})

/*
  Helper function
*/
function getTimeString (now) {
  var year = "" + now.getFullYear();
  var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month }
  var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day }
  var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour }
  var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute }
  var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second }
  var ms = "" + now.getMilliseconds(); while (ms.length < 3) { ms = "0"+ms }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second + "." + ms;
}

