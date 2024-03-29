var http = require('http');

function handler(req, res){
    console.log(req.url);
    if(req.url===`//page/index`){
      res.writeHead(200,{
        'Content-Type': 'text/html'
      });
      res.write(`<h1>Hellow world nod.js firstpage!`);
    }else if(req.url===`//page/about`){
      res.writeHead(200,{
        'Content-Type': 'text/html'
      });
      res.write(`<h1>About nod.js.`);
    }
    else {
      res.write(`<h1>Invalide url.`);
    }
    res.end();
}


//  var server = http.createServer(function(request, response) {
//     response.writeHead(200,headers={
//         "Content-type":"text/html"
//     });
//     response.write(`<h1>Hello Node.js<\h1>`);
//     response.end();

//  });
var server = http.createServer(handler);
const port=process.env.port || 3000;
server.listen(port);
// server.listen(3000, '0.0.0.0');