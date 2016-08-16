var should = require('should');
var sinon = require('sinon');


describe('lightbox controller test', function(){
   describe('post', function(){
      it('should not allow an empty title on lightbox', function(){
          var LightBox = function(lightbox){
              this.save = function(){};
          }

          var req = {
              body: {
                  imageLink: "The link"
              }
          }

          var res = {
              status: sinon.spy(),
              send: sinon.spy()
          }

          var lightboxController = require('../../controllers/lightboxController')(LightBox);
          lightboxController.post(req, res);

          res.status.calledWith(400).should.equal(true, 'Bad status' + res.status.args);
          res.send.calledWith('Title is required').should.equal(true);
      });
   });
});