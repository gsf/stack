function stack (/*layers*/) {
  // Innermost (last) handler is our overridable built-in one
  var handler = stack.handler

  // Nest handlers
  Array.prototype.slice.call(arguments).reverse().forEach(function (layer) {
    var child = handler
    handler = function (req, res) {
      try {
        layer(req, res, function (err) {
          if (err) return stack.handler(req, res, err) 
          child(req, res)
        })
      } catch (err) {
        stack.handler(req, res, err)
      }
    }
  })

  return handler
}

stack.handler = function (req, res, err) {
  res.setHeader['Content-Type'] = 'text/plain'
  if (err) {
    console.error(err.stack)
    res.statusCode = 500
    res.end('Error\n')
  } else {
    console.warn('Warning: Not Found')
    res.statusCode = 404
    res.end('Not Found\n')
  }
}

module.exports = stack
