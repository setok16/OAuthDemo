var express = require('express');
var router = express.Router();
var randomstring = require('randomstring');

/* GET home page. */
router.get('/', function(req, res, next) {
  var state = randomstring.generate();
  req.session.state = state;

  //console.log(state);
  var context = {
    title: 'CS496 OAuth Assignment',
    description: 'This is an assignment for an Oregon State University computer science class.',
    state
  };
  res.render('index', context);
});

module.exports = router;
