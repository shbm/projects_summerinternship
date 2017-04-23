var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/users');

var data = {
    title : "@CampusWire | Signup"
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { user : req.user });
});

router.post('/', function(req, res, next) {
    Account.register(new Account({
        username : req.body.username,
        email : req.body.email,
        name : req.body.name,
        twitter : req.body.twitter,
        name : req.body.name,
        password : req.body.password,
        day_joined : Math.floor(Date.now() / 1000)
    }), req.body.password, function(err, account) {
        if (err) {
            return res.render("login", {registerInfo: err.message});
        }
        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                console.log(req.user)
                res.redirect('../');
            });
        });
    });
});

module.exports = router;
