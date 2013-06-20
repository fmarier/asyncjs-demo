
app.configure(function () {
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'hi mom' }));
});




  var body = '<script src="https://login.persona.org/include.js"></script>';
  body += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>';




      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'content-length': body.length
      }
    }, onVerifyResp);
    request.write(body);
    request.end();


    function onVerifyResp(verifierRes) {
      var data = "";
      verifierRes.on('data', function (chunk) {
        data += chunk;
      });

      verifierRes.on('end', function () {



      });
    };

