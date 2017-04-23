var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;

var User = new Schema({
    username : { type: String, required: true },
    password : { type: String, required: true },
    fullname : { type: String, required: false },
    email : { type: String, required: true },
    submissions : { type: [String], required: false },
    upvoted : { type: [String], required: false },
    day_joined : { type: String, required: true },
    twitter_username : { type: String, required: false },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);
