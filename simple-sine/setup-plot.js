var request = require('request')
  , querystring = require('querystring')
  , config = require("../config.json")
  , key = config['ben2-api-key']
  , user = "BenPostlethwaite"
  , token = config['ben2-token']

var data1 = {
    'x':[]
  , 'y':[]
  , 'type':'scatter'
  , 'mode':'lines'
  , stream: {
    "token": token
  , "maxpoints": 500
  }
}

var data = [data1]

var query = {
    "un": user
  , "key": key
  , "origin": "plot"
  , "platform": "REST"
  , "args": JSON.stringify(data)
  , "kwargs": JSON.stringify({
     "filename": "mung3"
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
