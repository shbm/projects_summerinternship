var express = require('express');
var router = express.Router();
var Post = require('../models/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('submit', {user: req.user});
});

router.post('/', function(req, res, next) {
    var title = req.body.title;
    var url = req.body.url;
    var message = req.body.message;
    var root_url = url.split('/')[2];
    if(!url) {
        root_url = '';
    }
    var name = req.body.name;
    if(!req.body.name) {
        name = 'anonymous';
    }
    var date = (new Date()).toISOString().toString();
    var post = new Post({
        title : title,
        url : url,
        root_url : root_url,
        message : message,
        points : 0,
        timestamp : date,
        upvotes : 1,
        user : name
    });
    console.log((new Date()).toISOString());
    console.log(root_url);
    post.save(function(err) {
        if (err) throw err;
        console.log('User saved successfully!');
        res.redirect('/post/' + post._id);
    });
});

module.exports = router;
