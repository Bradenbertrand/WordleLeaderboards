let mongoose = require('mongoose');
const Score = require('../models/score');
const User = require('../models/user');

module.exports.run = async (bot, message, args) => {
    let regex = /Wordle \d\d\d .\/6/i;
    if (regex.test(message.content)) {
        let scoreid = message.author.id + message.content.slice(15, 18)
        let wordleNum = parseInt(message.content.slice(15, 18));
        let scoreNum = message.content.slice(19, 20);
        console.log(scoreNum)
        if ((scoreNum > 0 && scoreNum <= 6) || scoreNum == "X") {
            console.log("Valid score");
            if (scoreNum == "X") {
                scoreNum = 7
                message.channel.send("Failed! You've been given a score of 7 for this attempt.")
            }
        } else {
            message.channel.send("Don't be making up fake scores you goon");
            return;
        }
        let scorePat = message.content.slice(22);
        let serverid = message.guild.id;
        let userid = message.author.id;
        let userCurrentTotal;
        Score.findOne({ scoreId: scoreid }, function (err, pulledScore) {
            if (err) {
                console.log(err.stack);
                message.channel.send("There was a big dumpy error UwU Contact Big Daddy Braden to get it fixed :(")
            }

            if (!pulledScore) {
                let score = new Score();
                score.username = message.author;
                score.userId = userid;
                score.scoreId = scoreid;
                score.score = parseInt(scoreNum);
                score.wordleNumber = wordleNum;
                score.scorePattern = scorePat;
                score.serverId = serverid;
                score.save(function (err) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(scoreid + ' added to the database.');
                        message.channel.send("Score successfully added!")
                    }
                })

                User.findOne({ userId: userid }, function (error, currentUser) {
                    if (error) {
                        console.log("Theres been a error finding the user to update their score average")
                    } else {
                        let newRunningTotal = currentUser.runningTotal + scoreNum;
                        let newGamesPlayed = currentUser.gamesPlayed + 1;
                        let newScoreAvg = newRunningTotal / newGamesPlayed
                        console.log(currentUser.gamesPlayed)
                        console.log(currentUser.runningTotal)
                        console.log(currentUser.scoreAvg)
                        console.log(newGamesPlayed)
                        console.log(newRunningTotal)
                        console.log(newScoreAvg)
                        currentUser.runningTotal = newRunningTotal;
                        currentUser.gamesPlayed = newGamesPlayed;
                        currentUser.scoreAvg = newScoreAvg
                        currentUser.save(function(err) {
                            if (err) {
                                console.log("Error saving new user information")
                            } else {
                                console.log("Successfully saved new score average")
                            }
                        })
                    }
                })

            } else {
                message.channel.send("This score has already been added!");
            }
        })

    } else {
        message.channel.send("Invalid wordle score. Please copy paste the whole score with a space after !wlsave :)")
    }


}

module.exports.config = {
    command: "save"
}