var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');

/* GET oauth. */
router.get('/', function(req, res, next) {
  //var state = req.session.state;
  fs.readFile('./public/state.txt', function read(err, data) {
    var state = data;
    var code = req.query.code;

    var headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    var body = {
      'code': code,
      'client_id': '38377454915-j0952k9ejl2trrffs7d56ksqrm3jv4la.apps.googleusercontent.com',
      'client_secret': 'Bk4up1MP5qGB-ORryRzgON1l',
      'redirect_uri': 'https://oauth-demo-194701.appspot.com/oauth',
      'grant_type': 'authorization_code'
    };

    var postOptions = {
      url: 'https://www.googleapis.com/oauth2/v4/token',
      method: 'POST',
      headers: headers,
      form: body
    };

    request(postOptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        //console.log(JSON.parse(response.body).access_token);
        var token = JSON.parse(response.body).access_token;
        var authorization = 'Bearer ' + token;
        var getOptions = {
          url: 'https://www.googleapis.com/plus/v1/people/me',
          method: 'GET',
          headers: {
            'Authorization': authorization,
          }
        };
        request(getOptions, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var body = JSON.parse(response.body);
            var context = {
              title: 'OAuth Results',
              description: 'This is an assignment for an Oregon State University computer science class.',
              firstName: body.name.givenName,
              lastName: body.name.familyName,
              url: body.url,
              state
            };
            res.render('oauth', context);
          } else {
          }
        });

      }
    });
  });
});

module.exports = router;
