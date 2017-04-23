var mongoose = require('mongoose')
var Schema = mongoose.Schema;

module.exports = mongoose.model('Post', {
    title: { type: String, required: true },
    url: { type: String, required: false },
    root_url: {type: String, required: false },
    message: { type: String, required: false },
    user: { type: String, required: false },
    points: { type: Number, required: true },
    upvotes: { type: Number, required: true },
    timestamp: { type: String, required: true },
});
