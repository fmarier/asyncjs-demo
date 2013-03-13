var express = require('express');
var app = express();

app.configure(function () {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hi mom' }));
});

app.get('/', function (req, res) {
  if (req.session.user) {
    res.send('<h1>Hi ' + req.session.user + '</h1><p>Welcome to the future of socialisation on the Web.</p><p><b>-The Socializr 3000 team</b></p><p><a href="/logout">Logout</a></p>');
  }
  else {
    res.send('<h1>Socializr 3000</h1><p><b>VIP-only area</b></p><p><a href="/login">Login</a></p>');
  }
});

app.get('/login', function (req, res) {
  req.session.user = 'francois@mozilla.com';
  res.redirect('/');
});

app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/');
});

app.listen(3000);
