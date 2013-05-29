var assert = require('assert')
var http = require('http')
var stack = require('..')

http.createServer(stack(
  function (req, res, next) {
    next()
  }
)).listen(6402, function () {
  http.get('http://localhost:6402', function (res) {
    assert.equal(res.statusCode, '404')
    process.exit()
  })
})
