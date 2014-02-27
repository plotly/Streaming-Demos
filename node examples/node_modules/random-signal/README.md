random-signal
=============

Generate a pseudo-random signal for mocking Sensor data

``` javascript
var RandomSignal = require("../.")

var opt = {
  sep: "\n"     // seperator
, tdelta: 200   // milliseconds
}

var rs = RandomSignal(opt)

rs.pipe(process.stdout)

setTimeout( function () {
  rs.destroy()
}, 1000)

```
outputs

```shell
{"x":"2014-02-26 16:30:57.918","y":1.3151883383869654}
{"x":"2014-02-26 16:30:58.123","y":4.24176480313184}
{"x":"2014-02-26 16:30:58.328","y":3.719194025237043}
{"x":"2014-02-26 16:30:58.529","y":3.7442073803567077}
```

## Options
Along with Readable stream options, (including object mode) you may pass in these options or use the defaults given below

```javascript
  var tdelta = opt.tdelta || 50
    , hz = opt.hz || (1 / 20 * tdelta)
    , amp = opt.amp || 1
    , noiseHz = opt.noiseHz || 4 * hz
    , noiseAmp = opt.noiseAmp || 0.3 * amp
    , trendIV = opt.trendIV || (1000 * 1/hz)
    , lowtrend = opt.lowtrend || -amp
    , hightrend = opt.hightrend || amp
    , sep = opt.sep || ""
    , timeFormatter = opt.timeFormatter || getTimeString
```

### tdelta (milliseconds)
The millisecond time that data will be produced. The default is `50ms`.

### hz (seconds)
The frequency of the underlying sine signal. The default frequency for the sine wave is 1 cycle per 20 `tdelta`'s. This means that each cycle is fairly well sampled. It also means that setting `tdelta = 50` will result in a default of a cycle per second.

### amp
The amplitude of the underlying sine signal.

### noizeHz (seconds)
The frequency of the applied noise signal

### noiseAmp
The amplitude of the noise which will be randomly generated between 0 and `noiseAmp`

### trendIV (milliseconds)
The millisecond interval in which to apply a random trend constant to the output data. The default is `1000 * 1/hz` which provides a new trend every cycle of the underlying sine wave. If you want a longer trend, say applied every 5 cycles, set `trendIV = 5000 * 1/hz`. Remember the trendIV is in milliseconds, so the `1000` multiplication is necessary.

### hightrend
The maximum amplitude of the randomly applied constant trend. The default is `1`.

### lowtrend
The minimum amplitude of the randomly applied constant trend. The default is `-1`.

### sep
If the stream is not configured in objectMode this seperator will be applied to the end of the `utf8` encoded string `buffer`. The default is set to empty string `""`.

### timeFormatter
A function that takes a Javascript `Date` object as inputs and outputs a formatted date string. The default `getTimeString` function will output dates as `"YYYY-MM-SS HH:MM:SS.f"`


## Install
```bash
npm install random-signal
```
