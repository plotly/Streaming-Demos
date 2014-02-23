var Twit = require('twit')
  , hyperquest = require('hyperquest')
  , config = require('./config.json')
  , T = new Twit({
      consumer_key: config.consumer_key
    , consumer_secret: config.consumer_secret
    , access_token: config.access_token
    , access_token_secret: config.access_token_secret
  })



var token = "YJX8j6sUsA"
var options = {
    method: 'POST'
  , uri: "http://ec2-23-22-11-102.compute-1.amazonaws.com:10101"
  , port: 10101
  , headers: {
      "plotly-streamtoken": token
    , "connection": "keepalive"
  }
}


var req = hyperquest(options)

req.on("error", function (err) {
    console.log("request:", err)
    process.exit()
})


//
// filter the public stream by the latitude/longitude bounded box of San Francisco
//
var sanFrancisco = [ '-122.75', '36.8', '-121.75', '37.8' ]

var stream = T.stream('statuses/filter', { locations: sanFrancisco })

var i = 0;

stream.on('tweet', function (tweet) {
  if(i==1) return;
  t = tweet;
  console.log(tweet);
  i+=1; 
    /*
    var location = (location = tweet.geo) && (location = location.coordinates)
    if (!location) return
    var tags = tweet.entities.hashtags.map( function (hashobj) {
                   return hashobj.text
               })
    console.log(location, tags)
    req.write(JSON.stringify({"x":location[0],"y":location[1]})+"\n")
    */
})
