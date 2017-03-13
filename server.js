var express = require('express');
var app = express();
var path    = require('path');
var expressSanitizer = require('express-sanitizer');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //for working with database
var Email = require('./models/email');
var port    = process.env.PORT || 8080 // setting port
var morgan  = require('morgan'); //for logging

mongoose.connect('mongodb://localhost/srq_science')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressSanitizer()); //blocking stored XSS

app.use(morgan('dev'));
//set the public folder to server public assets
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('*', function(req, res){
  //this can only include the mailing list info
  if (req.body.email && req.body.fname){
      req.body.email = req.sanitize(req.body.email);
      req.body.fname = req.sanitize(req.body.fname);
      var email = new Email();
      email.email = req.body.email;
      email.name = req.body.fname;

      email.save(function(err) {
        if (err){
          return res.send(err);
        }
      });
    }
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(port);
