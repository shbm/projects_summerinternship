var express = require('express');
var router = express.Router();
var score = require('../score/score');
var Post = require('../models/posts');
var User = require('../models/users');

//GET home page.
router.get('/:page_no([0-9]+)?', function(req, res, next) {
    var url = require('url');
    var urlParts = url.parse(req.url, true);
    var query = urlParts.query;
    var upvoteItem = query.upvote;
    console.log("\n\nUpvote Item");
    console.log(upvoteItem);
    console.log("\n");
    //If there is a request to upvote a post
    if(upvoteItem) {
        console.log("\n\nTrying to upvote " + upvoteItem + " \n\n")
        //If a user is logged in
        if(req.user) {
            console.log("USER\n\n");
            console.log(req.user);
            //Check if user has already upvoted the post
            if ((req.user.upvoted).indexOf(upvoteItem) < 0) {
                //If user has not already upvoted
                console.log("\n\n" + upvoteItem + " Is not here\n\n")
                //PROCESS OF COUNTING THE UPVOTE
                User.findByIdAndUpdate(req.user._id, {$push: {upvoted: upvoteItem}}, {safe: true, upsert: true }, function(err, response) {
                    console.log(upvoteItem+" added to "+req.user._id);
                    console.log("\n\n\n");
                    //Now counting to UPVOTE
                    Post.findById(upvoteItem, function(err, d) {
                        var pt = (score(d.upvotes, new Date(d.timestamp)));
                        Post.findByIdAndUpdate(upvoteItem, {$inc: {upvotes: 1}, $set: {points: pt}}, function(err, doc){
                            console.log("DOC"+doc);
                        });
                    });
                });
            //If user has already upvoted the post
            } else {
                console.log("\n\n" + upvoteItem + " is already there \n\n\n")
                req.flash('alreadyUpvoted', 'You can upvote a post only once')
                res.render('index', {message: req.flash('alreadyUpvoted')})
            }
        //if no user is logged in
        } else {
            req.flash('info', 'You need to Login/Register to upvote!');
            res.render('login', {info : req.flash('info')});
        }
    }

    var pagination = req.params.page_no;
    var sk=30;
    var limit = 30;
    if(pagination > 1) {
        sk *= pagination;
    }
    var next_page = sk/limit+1;
    Post
        .find({})
        .sort({points : -1})
        .limit(30)
        .skip(sk-30)
        .exec(function(err, post) {
            console.log('Data RECEIVED from MongoLab');
            if ((err) || (post == undefined)) {
                res.status(404).send('404. Nothing To Show Here!');
            } else {
                if(post[0] == undefined) {
                    res.render('index', {data : "That's all we have for today, folks!"})
                }
                res.render('index', {post : post, user : req.user, next_page : next_page, rank : (next_page-2)*30});
            }
        });
});

router.post('/', function(req, res, next) {
    console.log(req.params.upvote);
});

module.exports = router;
