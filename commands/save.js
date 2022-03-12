let mongoose = require('mongoose');
const Score = require('../models/score');
const User = require('../models/user');

module.exports.run = async (bot, message, args) => {
    console.log("Save has been run");
    //Regex to verify message format
    let regex = /Wordle \d\d\d .\/6/i;
    //If its a valid...
    if (regex.test(message.content)) {
        let scoreid = message.author.id + message.content.slice(15, 18)
        let wordleNum = parseInt(message.content.slice(15, 18));
        let scoreNum = message.content.slice(19, 20);
        let win = true;
        let points;
        console.log(scoreNum)
        //Verifies the score is a valid score
        if ((scoreNum > 0 && scoreNum <= 6) || scoreNum == "X") {
            console.log("Valid score");
            //If the user failed, give a score of 7
            if (scoreNum == "X") {
                scoreNum = 7
                win = false;
                message.channel.send("Failed! You've been given a score of 7 for this attempt.")
            }
        } else {
            //Error message when score is not valid
            message.channel.send("Don't be making up fake scores you goon");
            return;
        }
        //Calculate points scored
        if (scoreNum == 1) {
            points = 12
        } else if (scoreNum == 2) {
            points = 10
        } else if (scoreNum == 3) {
            points = 8
        } else if (scoreNum == 4) {
            points = 6
        } else if (scoreNum == 5) {
            points = 4
        } else if (scoreNum == 6) {
            points = 2
        } else if (scoreNum == "X") {
            points = 0
        }
        //Saves score information
        let scorePat = message.content.slice(22);
        let serverid = message.guild.id;
        let userid = message.author.id;
        let userCurrentTotal;
        //See if score already exists
        Score.findOne({ scoreId: scoreid }, function (err, pulledScore) {
            if (err) {
                console.log(err.stack);
                message.channel.send("There was a big dumpy error UwU Contact Big Daddy Braden to get it fixed :(")
            }
            //If it doesn't exist, create a new score
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
                //Find the user's profile to calculate and save new information based on score
                User.findOne({ userId: userid }, function (error, currentUser) {
                    if (error) {
                        console.log("Theres been a error finding the user to update their score average")
                    } else {
                        //Score average, running total, and gamesplayed calculations
                        let newRunningTotal = currentUser.runningTotal + parseInt(scoreNum);
                        let newGamesPlayed = currentUser.gamesPlayed + 1;
                        let newScoreAvg = (newRunningTotal / newGamesPlayed)
                        currentUser.runningTotal = newRunningTotal;
                        currentUser.gamesPlayed = newGamesPlayed;
                        currentUser.scoreAvg = newScoreAvg
                        //Wins and losses calculations
                        if (win) {
                            currentUser.wins = currentUser.wins + 1
                        } else {
                            currentUser.losses = currentUser.losses
                        }
                        currentUser.winRate = (currentUser.wins/currentUser.gamesPlayed) * 100
                        //Add points to user account
                        currentUser.points = currentUser.points + points;
                        if (points >= 0) {
                            message.channel.send("You've earned " + points + " points!")
                        } else if (points < 0) {
                            message.channel.send("You've lost "  + Math.abs(points) + " points :(")
                        }
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
                //If the score already exists in the db
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