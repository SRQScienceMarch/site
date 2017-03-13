var express = require('express');
var app     = express();
var path    = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); //for working with database
var port    = process.env.PORT || 8080 // setting port
var morgan  = require('morgan'); //for logging

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
//set the public folder to server public assets
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('*', function(req, res){
  //this can only include the mailing list info
  if (req.body.email && req.body.fname){
    //log in DB
    
  }
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(8080);
console.log("Check out port 8080");
