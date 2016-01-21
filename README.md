## Description
node-cdn-bench is a small CLI utility written with Node.js that allows for easy benchmarking of file downloads, specifically to test the differences between content delivery networks. It allows you to specify an interval, length of the test and outputs the results to a CSV file.

## Installation

```
npm install cdn-bench
```

## Usage

```bash
node cdn-bench \
    --files [file1,file2,...] \
    --interval [seconds between tests] \
    --limit [number of iterations] \
    --out [output filename]
```

The below command will download each listed file one at a time every 5 minutes for 24 hours.

```bash
node cdn-bench \
    --files http://example.com/image.png,http://example.com/image2.png \
    --interval 300 \
    --limit 288 \
    --out results.csv
```

If you are running these tests on a virtual machine, it is recommend to pair it with something like [forever](https://github.com/nodejitsu/forever) to turn the test into a daemon.

## License

Copyright (c) 2014-2016 James Simpson and GoldFire Studios, Inc.

Released under the MIT License.