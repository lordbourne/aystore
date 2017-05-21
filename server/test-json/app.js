var http = require('http');
var fs = require('fs');

// fs.readFileSync('./artlist.json', 'utf-8');


var port = 1234;

var server = new http.Server();
server.on('request', function (req, res) {
  fs.readFile('./artlist.json', 'utf-8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      data = data.toString();
      console.log(data);
      res.writeHead(200, {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
      });
      // res.write(data);
      res.write(data);
      res.end();
    }
  });
});
server.listen(port);
console.log('listening on: ' + port);
