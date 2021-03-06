var express = require('express');
var router = express.Router();
var Post = require('../models/posts');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}

/* GET users listing. */
router.get('/:userName([0-9A-Za-z._]+)', function(req, res, next) {
    var userName = req.params.userName;
    Post
        .find({user: userName})
        .exec(function(err, post) {
            console.log("Retreiving posts for user: "+userName);
            res.render('userPost', {post: post});
        });
});

module.exports = router;
