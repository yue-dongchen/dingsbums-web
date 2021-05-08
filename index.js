const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const urlParser = bodyParser.urlencoded();

console.log('here');
var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/results', (req, res) => {
  console.log(req.query);
  res.sendFile(path.resolve('html', 'results.html'));
});

app.get('/item', (req, res) => {
  res.sendFile(path.resolve('html', 'item.html'));
})

app.get('/login', (req, res) => {
  res.sendFile(path.resolve('html', 'login.html'));
})

const querystring = require('querystring');

app.post('/login', urlParser, (req, res) => {
  console.log(req.body);
  var post_data = querystring.stringify({
      'username': req.body.username,
      'password': req.body.password
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'localhost',
      port: '3000',
      path: '/users/sign_in',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(resp) {
      resp.setEncoding('utf8');
      resp.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          res.cookie('jwt', JSON.parse(chunk).token);
          res.sendStatus(200);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

  // res.cookie('jwt', jwt);

});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('html', 'index.html'));
});


const server = http.createServer(app);
server.listen(8080, 'localhost');
