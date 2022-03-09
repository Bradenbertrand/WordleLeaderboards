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

    await getSolution.getSolution(args).then( solution => {
        console.log(solution)
        if (sortedArray.length == 0) {
            message.channel.send("No score found. Could be that you didn't play this day, or the number you entered was invalid.")
        } else {
            message.channel.send(`Wordle ${scoreid} ${sortedArray[0].score}/6 ${sortedArray[0].scorePattern}
            solution: ||${solution}||`)
        }
    })

}

module.exports.config = {
    command: "get"
};