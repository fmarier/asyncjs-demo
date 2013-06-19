var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('<h1>Hi there</h1><p>Welcome to the future!<p><b>-The Socializr 3000 team');
});

app.listen(3000);
