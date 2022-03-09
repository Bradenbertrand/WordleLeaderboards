const Score = require('../models/score');
const getSolution = require('../helpers/getSolution');

module.exports.run = async (bot, message, args) => {
    let userid = message.author.id.slice(0, 10);
    let scoreid = args;
    let scores = await Score.find({});

    let sortedArray = scores.filter(function (score) {
        return score.userId.slice(0,10) == userid
    }).filter(function (score) {
        return score.wordleNumber == scoreid
    })

    let solution = getSolution(args)

    if (sortedArray.length == 0 || solution == "") {
        message.channel.send("No score found. Please try again with a valid 3 digit game")
    } else {
        message.channel.send(`Wordle ${scoreid} ${sortedArray[0].score}/6 ${sortedArray[0].scorePattern}
        solution: ||${solution}||`)
    }
}

module.exports.config = {
    command: "get"
};