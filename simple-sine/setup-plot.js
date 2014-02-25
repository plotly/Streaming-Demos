var request = require('request');
var querystring = require('querystring');


// DEV

var key = ""
var user = ""

var data2 = {
    'x':[]
  , 'y':[]
  , 'type':'scatter'
  , 'mode':'lines'
  , stream: {
    "token": ""
  , "maxpoints": 500
  }
}


var data = [data2]

var query = {
    "un": user
  , "key": key
  , "origin": "plot"
  , "platform": "REST"
  , "args": JSON.stringify(data)
  , "kwargs": JSON.stringify({
     "filename": "mung2"
   , "fileopt": "overwrite"
    , "layout": {
        "title": "bitcoin stock price"
      , "width" : 600
      , "height": 600
    }
    , "world_readable": true
  })
};


request(
    {
        method: 'POST'
      // , uri: 'https://plot.ly/clientresp'
      , uri: 'http://ec2-54-225-12-108.compute-1.amazonaws.com/clientresp/'
      , body:  querystring.stringify(query)
    }
  , function (err, res) {

      if(res.statusCode == 200){
        var payload = JSON.parse(res.body);
        console.log(payload)
      }

      else {
        console.log('error: '+ err, 'status', res.statusCode);
      }

    }

)
