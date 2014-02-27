var request = require('request');
var querystring = require('querystring');


// DEV

var user = "Streaming-Demo"; // Your plotly username or email. Sign up here: https://plot.ly/ssu
var key = "unqmhifzd1"; // Your plotly API key, view here: https://plot.ly/api/key
var token1 = "rso0jwpmfg";
var token2 = "kydr0ia5tj";
var filename = "streaming second";
var server = 'http://ec2-54-196-84-85.compute-1.amazonaws.com/'; //'http://ec2-54-225-12-108.compute-1.amazonaws.com/'

var data = [{
    x:[1, 1, 1, 1, 1]
  , y:[5, 6, 7, 8, 9]
  , type:'scatter'
  , mode:'lines'
  , stream: {
      token: token1
    , maxpoints: 10
    }
  }
  ,{
    x:[2, 2, 2, 2, 2]
  , y:[1, 2, 3, 4, 5]
  , type: 'scatter'
  , mode: 'lines'
/*  , stream: {
      token: token2
    , maxpoints: 10
    }*/
  }
]

var query = {
    un: user
  , key: key
  , origin: "plot"
  , platform: "REST"
  , args: JSON.stringify(data)
  , kwargs: JSON.stringify({
     filename: filename
   , fileopt: "overwrite"
    , layout: {
        title: "streaming-demo"
      , width : 600
      , height: 600
    }
    , world_readable: true
  })
};


request(
    {
        method: 'POST'
      // , uri: 'https://plot.ly/clientresp'
      , uri: server+'clientresp/'
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
