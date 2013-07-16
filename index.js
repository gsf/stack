function stack (/*layers*/) {
  // Innermost (last) handler is always 404
  var handler = stack.notFoundHandler

  // Nest handlers
  Array.prototype.slice.call(arguments).reverse().forEach(function (layer) {
    var child = handler
    handler = function (req, res) {
      try {
        layer(req, res, function (err) {
          if (err) return stack.errorHandler(req, res, err) 
          child(req, res)
        })
      } catch (err) {
        stack.errorHandler(req, res, err)
      }
    }
  })

  return handler
}

stack.errorHandler = function (req, res, err) {
  console.error(err.stack)
  res.writeHead(500, {'Content-Type': 'text/plain'})
  res.end('Error\n')
}

stack.notFoundHandler = function (req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'})
  res.end('Not Found\n')
}

module.exports = stack
