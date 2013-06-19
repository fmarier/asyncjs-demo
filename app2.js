var express = require('express');
var app = express();

app.configure(function () {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hi mom' }));
});

app.get('/', function (req, res) {
  if (req.session.user) {
    res.send('<h1>Hi ' + req.session.user + '</h1><p>Welcome to the future!<p>a href="/logout">Logout</a>');
  }
  else {
    res.send('<h1>Socializr 3000</h1><p><a href="/login">Login</a>');
  }
});

app.get('/login', function (req, res) {
  req.session.user = 'shout@ozten.com';
  res.redirect('/');
});

app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/');
});

app.listen(3000);
