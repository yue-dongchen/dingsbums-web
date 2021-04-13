const express = require('express');
const path = require('path');
const http = require('http');

console.log('here');
var app = express();

app.use(express.static(__dirname));
// app.use(express.static(__dirname + '/javascript'));
// app.use("/images",  express.static(__dirname + '/public/images'));

app.get('/results', (req, res) => {
  console.log(req.query);
  res.sendFile(path.resolve('html', 'results.html'));
});

app.get('/item', (req, res) => {
  res.sendFile(path.resolve('html', 'item.html'));
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('html', 'index.html'));
});


const server = http.createServer(app);
server.listen(8080, 'localhost');
