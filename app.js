"use strict"
var express = require('express');

var app = express();
var PORT = process.env.PORT || 3000;

app.get('/', function(req, res){
    res.send('welcome to my API.');
});

app.listen(PORT, function() {
   console.log('Gulp is running the server on port ' + PORT);
});
