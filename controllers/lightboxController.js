'use strict'

var lightboxControler =  function(LightBox) {

    var _post = function(req, res) {
        var lightbox = new LightBox(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }else {
            lightbox.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(201);
                    res.send(lightbox);
                }
            });
        }
    };
    
    var _get = function(req, res) {
        var query = {};

        if(req.query.title) {
            query.title = req.query.title;
        }

        LightBox.find(query, function(err, lightboxes) {
            if(err) {
                res.status(500).send(err);
            } else {
                var lightBoxArray = [];
                lightboxes.forEach(function(elem, index, array){
                    var newLightBox = elem.toJSON();
                    newLightBox.links = {};
                    newLightBox.links.self = 'http://' + req.headers.host + '/api/LightBoxes/' + newLightBox._id;
                    lightBoxArray.push(newLightBox);
                });
                res.json(lightBoxArray).stringify;
            }
        });
    };

    return {
        post: _post,
        get : _get
    }
};

module.exports = lightboxControler;