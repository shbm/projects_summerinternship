var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var mongoose = require('mongoose');

var URL = require('./config/db').url;

// Connecting to MongoDB
if (mongoose.connect(URL)) {
    console.log('Connected to MongoLab');
    console.log(URL)
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

//maxAge is 24 hours.
app.use(session({
    cookie: { maxAge: 86400000 },
    resave: false,
    saveUninitialized: false,
    secret: 'What will be the name?'
}));
app.use(flash());


app.use(require('express-session')({
    secret: 'What Will Be The Name?',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

var Account = require('./models/users');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// ROUTES
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/submit', require('./routes/submit'));
app.use('/signup', require('./routes/signup'));
app.use('/login', require('./routes/login'));
app.use('/post', require('./routes/post'));
app.use('/logout', require('./routes/logout'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    //res.render('error', {
        //message: err.message,
        //error: {}
    //});
});

module.exports = app;
