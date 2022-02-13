const User = require('../models/user');

module.exports.run = async (bot, message, args) => {
    if (args == "") {
        //Creates an array based on users in the current server, sorted by points descending with a limit of 5 users.
        const usersSorted = await User.find({ servers: message.guild.id}).sort({ points: -1 }).limit(5);
        try {
            var i = 1
            var returnedScores = `Top users for this server:\n`;
            //Create a line of text for each user
            usersSorted.forEach((user) => {
                returnedScores += `#${i} - ${user.username} with ${user.points} points\n`
                i += 1
            })
            //Returns the created string
            message.channel.send(returnedScores);
            console.log("Successfully put out scores")
        } catch (err) {
            console.log(err)
            message.channel.send("There has been an error! This is probably due to less than 5 people having scores on your server.")
        }
    } else if (args == "all") {
        //Creates an array based on users in all servers, sorted by points descending with a limit of 5 users.
        const usersSorted = await User.find({}).sort({ points: -1 }).limit(5);
        try {
            var i = 1
            var returnedScores = `Top users for all servers:\n`;
            //Create a line of text for each user
            usersSorted.forEach((user) => {
                returnedScores += `#${i} - ${user.username} with ${user.points} points\n`
                i += 1
            })
            //Returns the created string
            message.channel.send(returnedScores);
            console.log("Successfully put out scores")
        } catch (err) {
            console.log(err)
            message.channel.send("There has been an error! This is probably due to less than 5 people having scores on your server.")
        }
    } else if (args == "avg") {
        //Creates an array based on users in the current server, with a score higher than 0.1, with a limit of 5 users.
        const usersSorted = await User.find({ servers: message.guild.id, scoreAvg: { $gte: 0.1 }, gamesPlayed: { $gte: 2 } }).sort({ scoreAvg: 1 }).limit(5);
        try {
            var i = 1
            var returnedScores = `Top averages for this server:\n`;
            //Create a line of text for each user
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
    } else if (args == "avg all") {
        //Creates an array based on all users in the current server, with a score higher than 0.1, with a limit of 5 users.
        const usersSorted = await User.find({ scoreAvg: { $gte: 0.1 }, gamesPlayed: { $gte: 2 } }).sort({ scoreAvg: 1 }).limit(5);
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
    } else {
        message.channel.send("Invalid arguments. use !wlhelp to see commands.")
    }
}

module.exports.config = {
    command: "top"
}