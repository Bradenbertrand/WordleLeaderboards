const User = require('../models/user');

module.exports.run = async (bot, message, args) => {
    let userid = message.author.id
    //Finds a user based on userId
    User.findOne({ userId: userid}, function (err, currentUser) {
        if (err) {
            console.log("Theres been an error finding a user")
            message.channel.send("Theres been an error contact big daddy braden pls :)")
        }
        //If user does not exist, send a error. This should never happen.
        if (!currentUser) {
            console.log("User does not exist")
            message.channel.send("You don't exist or something. That's pretty weird.")
        } else {
            //Send a message with the username and average score of the message sender.
            message.channel.send("User " +
            message.author.username + " has won " + 
            currentUser.wins + " games and lost " +
            currentUser.losses + ", with a win rate of " + currentUser.winRate.toFixed(2) + "%.");
        }
    })
}

module.exports.config = {
    command: "wins"
}