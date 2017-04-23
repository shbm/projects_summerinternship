var express = require('express');
var passport = require('passport');
var Account = require('../models/users');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('login', { info : req.flash('info')[0], user : req.user});
});

router.post('/', passport.authenticate('local'), function(req, res, next) {
    console.log(req);
    console.log(res);
    console.log(next);
    req.session.save(function (err) {
        console.log(err);
        if (err) {
            return next(err);
        }
        res.redirect('../');
    });
});

module.exports =  router;
