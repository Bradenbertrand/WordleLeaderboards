const User = require('../models/user');

module.exports.run = async (bot, message, args) => {
    //Creates an array based on all users in the current server, with a score higher than 0.1, with a limit of 5 users.
    const usersSorted = await User.find({ scoreAvg: { $gte: 0.1}}).sort({scoreAvg: 1}).limit(5);
    try {
    var i = 1
    var returnedScores = `Top averages for all servers:\n`;
    //Creates a line of text for each user
    usersSorted.forEach((user) => {
        returnedScores += `#${i} - ${user.username} with an avg score of ${user.scoreAvg.toFixed(2)}\n`
        i += 1
    })
    //Returns the created string
    message.channel.send(returnedScores);
    console.log("Successfully put out scores")
    } catch (err) {
        console.log(err)
        message.channel.send("There has been an error! This is probably due to less than 5 people having scores on your server.")
    }
}

module.exports.config = {
    command: "topall"
}