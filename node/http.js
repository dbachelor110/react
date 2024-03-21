var http = require('http');
 var server = http.createServer(function(request, response) {
    response.writeHead(200,headers={
        "Content-type":"text/html"
    });
    response.write(`<h1>Hello Node.js<\h1>`);
    response.end();

 });
 server.listen(80, '0.0.0.0');