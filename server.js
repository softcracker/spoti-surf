const fs = require('fs')
const http = require('http')
const proxy = require('http-proxy')

const PORT = process.env.PORT || 9000
const SecondPORT = process.env.PORT || 443

proxyServer = proxy.createProxyServer({target:'https://spoti-surf.heroku.com'})

proxyServer.listen(80)

server = http.createServer((req, res) => {
    console.log("http request")
    proxyServer.web(req, res, {
        target: req.url
    })

    proxyServer.on('error', function(e) {
        console.log("Error in proxy call")
    })
    proxyServer.listen(SecondPORT)
})

server.listen(PORT)
