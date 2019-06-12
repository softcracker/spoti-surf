const http = require('http')
const httpProxy = require('http-proxy')
const fs = require('fs')
const PORT = 443
const PORT2 = process.env.PORT || 9000

// Create your proxy server and set the target in the options.
try {
     proxy = httpProxy.createServer({
        ssl: {
          key: fs.readFileSync('key.pem', 'utf8'),
          cert: fs.readFileSync('cert.pem', 'utf8')
        },
        target: 'https://spoti-surf.herokuapp.com',
        secure: true // Depends on your needs, could be false.
      }).listen(PORT)
} catch (err) {
    console.log(err)
}

// Create your target server
try {
    http.createServer(function (req, res) {
      proxy.web(req, res, {target: req.url})
    }).listen(PORT2)
} catch (err) {
    console.log(err)
}
