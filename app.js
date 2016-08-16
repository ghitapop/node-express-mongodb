"use strict"
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;
if(process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/streamdbTest');
} else {
    db = mongoose.connect('mongodb://localhost/streamdb');
}

var LightBox = require('./model/lightbox');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var lightBoxRouter = require('./routes/lightBoxRoutes')(LightBox);

app.use('/api', lightBoxRouter);

app.get('/', function(req, res){
    res.send('Welcome to my API.');
});

app.listen(PORT, function() {
   console.log('Gulp is running the server on port ' + PORT);
});

module.exports = app;