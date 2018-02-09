var express = require('express');
var router = express.Router();
var randomstring = require('randomstring');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var state = randomstring.generate();
  console.log(state);
  fs.writeFile('./public/state.txt', state, (err) =>{
    console.log('state saved');
    var context = {
      title: 'CS496 OAuth Assignment',
      description: 'This is an assignment for an Oregon State University computer science class.',
      state
    };
    res.render('index', context);
  });
});

module.exports = router;
