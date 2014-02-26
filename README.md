# Plotly streaming examples

Plotly streaming is an experimental feature and you should expect all the craziness that comes with this.

## What is Plotly streaming?
1. Take a look at this and this!

![Example 1](https://raw.github.com/plotly/Streaming-Demos/master/readme_gifs/hansrosling.gif)

2. This is real-time data, everybody viewing these streaming plots sees the same data at the same time.
3. If you are the owner of the plot you can head over to the Plotly webapp and style your streaming plot. When you save it all the shared plots are updated live to reflect these changes.
4. You can open another users streaming shared plot in the Plotly webapp and make your own styles but saving will result in a static copy (you can't steal someone else's stream!).
5. Changing the plot a stream token is linked to will automatically save the most recent data so viewers of the old plot will at least see the most recent static data.
6. Again, this is a highly experimental feature, and our production cluster will be continuously updated, which unfortunately means breaking incoming streams ... be prepared to restart your scripts.


This repo contains several examples for working with the Plotly streaming API. There are 2 node.js repos and an IPython notebook example. As it is early days for Plotly's streaming API it should be considered experimental and will likely undergo changes as the feedback + iteration cycle continues. If you have any problems, notice any bugs (you will) or would like to provide us with suggestions you can hit us up at ben@plot.ly or send us a tweet at @plotlygraphs. We fully intend to add more examples to this repo, and if you have a sweet example that you would like us to include here, send a pull request!

See the individual Repo's for example specific documentation.


## Basic streaming ideas

Streaming has been added as an additional API layer on top of our [static graph API](http://plot.ly/api/). Therefore you follow the steps for making an API call to our plotting server and once confirmation is given proceed to stream data to the given address. Here is a little node.js demo:
```javascript
Plotly = require("plotly")
data = {
    'x':[]
  , 'y':[]
  , 'type':'scatter'
  , 'mode':'lines'
  , stream: {
    "token": token
  , "maxpoints": 500
  }
}
plotly.plot(data, un, key, layout)
})
```
That should give you a response which will look something like
```bash
stream-host: 'http://stream.plot.ly',
stream-status: 'All Streams Go!',
url: 'https://plot.ly/~BenPostlethwaite/0',
filename: 'mung3',
message: 'High five! You successfuly sent some data to your account on plotly. View your plot in your browser at https://plot.ly/~BenPostlethwaite/0 or inside your plot.ly account where it is named "mung3"'
```
All Streams Go! So now the streaming cluster has been initialized with your information and the streaming token has been configured to a particular data object. The return message shows us the sharable plot URL where we can view our streaming data as well as the address to stream to. So let's start our stream!

```javascript
var hyperquest = require("hyperquest")
var datastream = require("some-data-stream")

var options =  {
    method: 'POST'
  , uri: "http://stream.plot.ly/"
  , headers: {
  , "plotly-streamtoken": token
  }
}

var req = hyperquest(options)

datastream.pipe(req)
```
Okay, super easy? Well, for real-time sharable & embeddable data visualization it sure is easier than all the other alternatives. So the general idea is to make a regular Plotly call which returns either a success or a fail. If your data object was formatted correctly and your user + api-key + streaming-token are valid then it will let you know you are good to stream. Then you point your data your at our servers and stream on! There are many cool features that haven't been discussed and a fair amount of considerations

## Details
