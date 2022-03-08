const Score = require('../models/score');
module.exports.run = async (bot, message, args) => {
    let userid = message.author.id.slice(0, 10);
    let scoreid = args;
    let scores = await Score.find({});
    console.log(scores.length);

    let sortedArray = scores.filter(function (score) {
        return score.userId.slice(0,10) == userid
    }).filter(function (score) {
        return score.wordleNumber == scoreid
    })

    if (sortedArray.length == 0) {
        message.channel.send("No score found. Please try again with a valid 3 digit game")
    } else {
        message.channel.send(`Wordle ${scoreid} ${sortedArray[0].score}/6
        ${sortedArray[0].scorePattern}`)
    }
}

module.exports.config = {
    command: "get"
};