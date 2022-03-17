const User = require('../models/user');
const Score = require('../models/score');

module.exports.run = async (bot, message, args) => {
    console.log("avg has been run") 
    if (args == "") {
        let userid = message.author.id
        //Finds a user based on userId
        User.findOne({ userId: userid}, function (err, currentUser) {
            if (err) {
                console.log("Theres been an error finding a user");
                message.channel.send("Theres been an error contact big daddy braden pls :)");
            }
            //If user does not exist, send a error. This should never happen.
            if (!currentUser) {
                console.log("User does not exist");
                message.channel.send("You don't exist or something. That's pretty weird.");
            } else {
                //Send a message with the username and average score of the message sender.
                message.channel.send("User " +
                message.author.username + " has played " + 
                currentUser.gamesPlayed + " games with an average score of " +
                currentUser.scoreAvg);
            }
        })
    } else if (args == "daily") {
        var todayDate = new Date();
        let todaysScores = await Score.find({ date: { $gte: `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate()}` } }).sort({ score: 'asc' })
        let scoreArray = [];
        let dailyAverage;
        try {
            const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;
            todaysScores.forEach((score) => {
                scoreArray.push(score.score)
            })
            dailyAverage = average(scoreArray).toFixed(2);
            message.channel.send(`Todays average: ${dailyAverage}`)
        } catch (error) {
            console.log(error)
            message.channel.send("There has been an error processing todays scores.")
        }
    } else {
        message.channel.send("Invalid arguments")
    }
    
}

module.exports.config = {
    command: "avg"
}