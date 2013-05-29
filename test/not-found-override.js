var assert = require('assert')
var http = require('http')
var stack = require('..')

stack.notFoundHandler = function (req, res) {
  res.writeHead(404, {'Content-Type': 'application/json'})
  res.end('{"not found": true}\n')
}

http.createServer(stack(
  function (req, res, next) {
    next()
  }
)).listen(6402, function () {
  http.get('http://localhost:6402', function (res) {
    assert.equal(res.headers['content-type'], 'application/json')
    res.on('data', function (data) {
      assert(JSON.parse(data)['not found'])
      process.exit()
    })
  })
})
