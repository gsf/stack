var assert = require('assert')
var http = require('http')
var stack = require('..')

// Quiet stderr for prettier test output
process.stderr.write = function () {};

http.createServer(stack(
  function (req, res, next) {
    next(new Error('Passed to next()'));
  }
)).listen(6402, function () {
  http.get('http://localhost:6402', function (res) {
    assert.equal(res.statusCode, '500')
    process.exit()
  })
})
