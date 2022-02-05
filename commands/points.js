const User = require('../models/user');

module.exports.run = async (bot, message, args) => {
    let userid = message.author.id
    User.findOne({ userId: userid}, function (err, currentUser) {
        if (err) {
            console.log("Theres been an error finding a user")
            message.channel.send("Theres been an error contact big daddy braden pls :)")
        }
        if (!currentUser) {
            console.log("User does not exist")
            message.channel.send("You don't exist or something. That's pretty weird.")
        } else {
            message.channel.send("User " +
            message.author.username + " has a point total of " + currentUser.points);
        }
    })
}

module.exports.config = {
    command: "avg"
}