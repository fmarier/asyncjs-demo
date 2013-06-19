var express = require('express');
var app = express();

app.configure(function () {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hi mom' }));
});

app.get('/', function (req, res) {
  var body = '<script src="https://login.persona.org/include.js"></script>';
  body += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>';
  var loggedInUser = 'null';
  if (req.session.user) {
    loggedInUser = '"' + req.session.user + '"';
    body += '<h1>Hi ' + req.session.user + '</h1><p>Welcome to the future!<p><a href="javascript:navigator.id.logout()">Logout</a>';
  }
  else {
    body += '<h1>Socializr 3000</h1><p><a href="javascript:navigator.id.request()">Login</a>';
  }
  body += '<script>navigator.id.watch({'
    + 'loggedInUser: ' +  loggedInUser + ','
    + 'onlogin: function (assertion) {'
    + '  $.post("/login", {assertion: assertion}, function (data) {'
    + '    window.location = "/";'
    + '  });'
    + '},'
    + 'onlogout: function () {'
    + '  window.location = "/logout";'
    + '}})</script>';
  res.send(body);
});

app.post('/login', function (req, res) {
  req.session.user = 'shout@ozten.com';
  res.send('OK');
});

app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/');
});

app.listen(3000);
