/*!
 *  node-cdn-bench
 *  https://github.com/goldfire/node-cdn-bench
 *
 *  (c) 2014, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

// Require our dependencies.
var request = require('request'),
  fs = require('fs'),
  colors = require('colors'),
  fastsync = require('fastsync'),
  opts = require('nomnom').parse();

if (!opts.files || !opts.interval || !opts.limit) {
  console.log("Usage: node bench.js --files [filename1,...] --interval [seconds] --limit [number] --out [output file]".yellow.bold);
  return;
}

// Setup our testing variables.
var files = opts.files.split(','),
  interval = opts.interval,
  limit = opts.limit,
  out = opts.out;

// Setup the output file.
fs.writeFile(out, 'Time,' + opts.files);

// Begin the interval.
var total = 0;
setInterval(function() {
  // Check if we've reached the limit.
  total++;
  if (total > limit) {
    console.log("WIN - Benchmark complete!".green.bold);
    process.exit();
    return;
  }

  var output = fs.readFileSync(out, 'utf-8') + '\n' + new Date();

  // Loop through the files in order, one at a time.
  fastsync.seriesMap(files, function(file, fn) {
    var start = process.hrtime();
    request({
      url: file,
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    }, function() {
      var diff = process.hrtime(start);
      var seconds = (diff[0] * 1e9 + diff[1]) / 1e9;
      output += ',' + seconds;

      fn(null);
    });
  }, function() {
    fs.writeFile(out, output);
  });
}, interval * 1000);

// Create a method to get high resolution time.
var now = function() {
  var hrtime = process.hrtime();
  return hrtime[0] * 1000000 + hrtime[1] / 1000;
};

console.log(("Benchmark underway: " + limit + " " + interval + " second intervals.").cyan);