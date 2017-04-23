// From Hacker News algorithm
// http://amix.dk/blog/post/19574
var current_timestamp = new Date();

var score = function(votes, timestamp, gravity) {
    console.log(timestamp);
    console.log(current_timestamp);
    var age_hour = Math.floor(((current_timestamp - timestamp)/1000)/3600);
    console.log(age_hour);
    gravity = typeof a !== 'undefined' ? gravity : 1.8;
    return (Math.ceil(100*((votes-1)/Math.pow((age_hour+2), gravity))));
}

module.exports = score

