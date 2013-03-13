var express = require('express');
var https = require('https');
var qs = require('qs');

var app = express();

app.configure(function () {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hi mom' }));
  app.use(express.bodyParser());
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
    + '    if (data != "okay") {'
    + '      navigator.id.logout();'
    + '    }'
    + '    window.location = "/";'
    + '  });'
    + '},'
    + 'onlogout: function () {'
    + '  window.location = "/logout";'
    + '}})</script>';
  res.send(body);
});

app.post('/login', function (req, res) {
    function onVerifyResp(bidRes) {
      var data = "";
      bidRes.on('data', function (chunk) {
        data += chunk;
      });

      bidRes.on('end', function () {
        var verified = JSON.parse(data);
        if ('okay' == verified.status) {
          req.session.user = verified.email;
        } else {
          delete req.session.user;
        }
        res.send(verified.status);
      });
    };
    
    var body = qs.stringify({
      assertion: req.body.assertion,
      audience: 'http://localhost:3000'
    });

    var request = https.request({
      host: 'verifier.login.persona.org',
      path: '/verify',
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': body.length
      }
    }, onVerifyResp);
    request.write(body);
    request.end();
});

app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/');
});

app.listen(3000);
