var assert = require('assert')
var http = require('http')
var stack = require('..')

stack.errorHandler = function (req, res) {
  res.writeHead(500, {'Content-Type': 'application/json'})
  res.end('{"error": true}\n')
}

http.createServer(stack(
  function (req, res, next) {
    next(new Error('Overridden'))
  }
)).listen(6402, function () {
  http.get('http://localhost:6402', function (res) {
    assert.equal(res.headers['content-type'], 'application/json')
    res.on('data', function (data) {
      assert(JSON.parse(data)['error'])
      process.exit()
    })
  })
})
