const fs = require('fs')
const https = require('https')
const proxy = require('http-proxy')

const options = {
    ssl: {
        key: fs.readFileSync('valid-key.pem'),
        cert: fs.readFileSync('valid-cert.pem')
    }
}

const PORT = process.env.PORT || 9000

proxyServer = proxy.createProxyServer({target:'https://spoti-surf.heroku.com'})

proxyServer.listen(80)

server = https.createServer(options.ssl, function(req, res) {
    console.log("https request")
    proxyServer.web(req, res, {
        target: req.url
    })

    proxyServer.on('error', function(e) {
        console.log("Error in proxy call")
    })
    proxyServer.listen(443)
})

server.listen(PORT)
