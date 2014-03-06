var request = require('request');
var querystring = require('querystring');


// DEV

var user = "gmon01"; // Your plotly username or email. Sign up here: https://plot.ly/ssu
var key = "u6jlwbypiq"; // Your plotly API key, view here: https://plot.ly/api/key
var token1 = "g9ngw7qyyy";
var token2 = "begbqoc59p";
var filename = "streamingTemp";
var server = 'http://ec2-54-196-84-85.compute-1.amazonaws.com/'; //'http://ec2-54-225-12-108.compute-1.amazonaws.com/'

var data = [{
    x:[]
  , y:[]
  , type:'scatter'
  , mode:'lines'
  , stream: {
      token: token1
    , maxpoints: 10
    }
  }
  ,{
    x:[]
  , y:[]
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
