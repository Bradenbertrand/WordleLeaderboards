const User = require('../models/user');

module.exports.run = async (bot, message, args) => {
    const usersSorted = await User.find({ scoreAvg: { $gte: 0.1}}).sort({scoreAvg: 1}).limit(5);
    try {
    var i = 1
    var returnedScores = `Top averages for all servers:\n`;
    usersSorted.forEach((user) => {
        returnedScores += `#${i} - ${user.username} with an avg score of ${user.scoreAvg.toFixed(2)}\n`
        i += 1
    })
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