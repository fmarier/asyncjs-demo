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
    body += '<h1>Hi ' + req.session.user + '</h1><p>Welcome to the future of socialisation on the Web.</p><p><b>-The Socializr 3000 team</b></p><p><a href="javascript:navigator.id.logout()">Logout</a></p>';
  }
  else {
    body += '<h1>Socializr 3000</h1><p><b>VIP-only area</b></p><p><a href="javascript:navigator.id.request()">Login</a></p>';
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
  req.session.user = 'francois@mozilla.com';
  res.send('OK');
});

app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/');
});

app.listen(3000);
