const http = require('http')
const httpProxy = require('http-proxy')
const PORT = 8000
const PORT2 = 9000

// Create your proxy server and set the target in the options.
try {
    httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(PORT)
} catch (err) {
    console.log(err)
}

// Create your target server
try {
    http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2))
      res.end()
    }).listen(PORT2)
} catch (err) {
    console.log(err)
}
