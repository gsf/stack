var assert = require('assert')
var http = require('http')
var stack = require('..')

http.createServer(stack(
  function (req, res, next) {
    res.ok = true
    next()
  },
  function (req, res, next) {
    assert(res.ok)
    next()
  },
  function (req, res, next) {
    res.end()
  }
)).listen(6402, function () {
  http.get('http://localhost:6402', function (res) {
    assert.equal(res.statusCode, '200')
    process.exit()
  })
})
