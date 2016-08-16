'use strict'

var express = require('express');

var routes = function(LightBox){
    var lightBoxRouter = express.Router();

    var lightboxController = require('../controllers/lightboxController')(LightBox);

    lightBoxRouter.route('/LightBoxes')
        .post(lightboxController.post)
        .get(lightboxController.get);

    lightBoxRouter.use('/LightBoxes/:lightboxId', function(req, res, next){
        LightBox.findById(req.params.lightboxId, function (err, lightbox) {
            if(err) {
                res.status(500).send(err);
            } else if(lightbox){
                req.lightbox = lightbox;
                next();
            } else {
                res.status(404).send('no lightbox found!');
            }
        });
    });

    lightBoxRouter.route('/LightBoxes/:lightboxId')
        .get(function(req, res){
            res.json(req.lightbox);
        })
        .put(function(req, res){
            req.lightbox.title = req.body.title;
            req.lightbox.imageLink = req.body.imageLink;
            req.lightbox.disable = req.body.disable;

            req.lightbox.save(function(err){
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.lightbox);
                }
            });
            res.json(req.lightbox);
        })
        .patch(function(req, res){
            if(req.body._id) {
                delete req.body._id;
            }
            for(var p in req.body) {
                req.lightbox[p] = req.body[p];
            }

            req.lightbox.save(function(err) {
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.lightbox);
                }
            });
        })
        .delete(function(req, res){
            req.lightbox.remove(function(err){
                if(err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('The lightbox was removed.');
                }
            });
        });

    return lightBoxRouter;
};

module.exports = routes;
