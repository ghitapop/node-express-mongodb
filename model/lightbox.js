"use strict"

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lightBoxModel = new Schema({
    title: {
        type: String
    },
    imageLink: {
        type: String
    },
    disable: {
        type: Boolean,
        default: false
    }
});

module.export = mongoose.model('LightBox', lightBoxModel);
