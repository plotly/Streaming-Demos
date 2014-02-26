# simple-signal-stream

This is a basic [Node.js](http://nodejs.org/) example that you should try first to ensure you can produce a streaming plot. You will need three pieces of information. Your username, api-key and a streaming-token. You can get these by making an account at [Plotly](https://plot.ly) and then head over to [user settings](https://plot.ly/settings). You'll have to generate a streaming token with the generate token button.

Next you should clone this repo and install the required modules and put your username, api-key and stream token into `setup-plot.js` and `signal-stream.js`.

```shell
git clone https://github.com/plotly/Streaming-Demos.git
cd Streaming-Demos
npm install
cd simple-signal-stream
```
Open up `setup-plot.js` and `signal-stream.js` in your editor and put in your user information at the top. Now we are ready to get going.

```shell
node setup-plot.js
```
outputs
```shell
{"stream-host": "http://stream.plot.ly", "stream-status": "All Streams Go!", "url": "http://plot.ly/~bpostlethwaiteb/50", "filename": "streamSimpleSensor", "warning": "", "error": "", "message": ""}
```
of course your `url` will be different. Since we initialized the plot with empty arrays you will not see much at the `url` until we start streaming.
```shell
node signal-stream.js
```
Okay, now that should be streaming data to the plot given at the `url`. Head there and check it out.

### Success?
Cool! Now have some fun and modify these scripts, change the data stream or open it up in the webapp and restyle it and hit click `save` and have you changes propogate to any shared plots that are currently viewing your data!
Check out our other examples and don't forget to send us a tweet of your streaming plots at @plotlygraphs. Stream on!

### Hmmmm...
This is all new and experimental so no worries, send me an email at ben@plot.ly. I will get back to you ASAP.
