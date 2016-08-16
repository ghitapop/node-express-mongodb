'use strict'

var should = require('should'),
    request = require('supertest'),
    app = require('../../app'),
    mongoose = require('mongoose'),
    LightBox = mongoose.model('LightBox'),
    agent = request.agent(app);

describe('Lightbox CRUD test', function(){
    it('should post a lightbox an disable and _id', function(done){
       var  lightboxPost = {title: "Title test", imageLink: "link"};

        agent.post('/api/LightBoxes')
            .send(lightboxPost)
            .expect(200)
            .end(function(err, results){
                results.body.disable.should.equal(false);
                results.body.should.have.property('_id')
                done();
            });
    });

    afterEach(function(done){
        LightBox.remove().exec();
        done();
    });
});