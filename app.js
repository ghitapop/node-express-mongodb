"use strict"
var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/streamdb');
var LightBox = require('./model/lightbox');

var app = express();
var PORT = process.env.PORT || 3000;

var lightBoxRouter = express.Router();

lightBoxRouter.route('/LightBoxes')
    .get(function(req, res) {
        LightBox.find(function(err, lighboxes){
            if(err) {
                console.log(err);
            }else {
                res.json(lighboxes);
            }
        });
    });

app.use('/api', lightBoxRouter);

app.get('/', function(req, res){
    res.send('Welcome to my API.');
});

app.listen(PORT, function() {
   console.log('Gulp is running the server on port ' + PORT);
});
