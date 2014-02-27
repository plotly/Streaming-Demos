var RandomSignal = require("../.")

var opt = {
    sep: "\n"     // seperator
  , tdelta: 100   // milliseconds
}

var rs = RandomSignal(opt)

rs.pipe(process.stdout)

setTimeout( function () {
  rs.destroy()
}, 10000)