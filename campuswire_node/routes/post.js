var express = require('express');
var router = express.Router();

var Post = require('../models/posts');

/* GET home page. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Post
        .find({
            _id: id
        })
        .exec(function(err, post) {
            console.log(post);
            if ((err) || (post == undefined)) {
                res.status(404).send('This URL does not exist...I mean it dooes exist but there is nothing to show!');
            } else {
                res.render('post', { post: post[0], user: req.user });
            }
        });
});

module.exports = router;
