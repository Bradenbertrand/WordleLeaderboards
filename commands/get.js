const Score = require('../models/score');
module.exports.run = async (bot, message, args) => {
    let userId = message.author.id;
    let scoreid = message.author.id + args;
    console.log(scoreid);
    let score = Score.findOne({ scoreId: scoreid })
    let returnedScore = `Wordle ${score.wordleNumber} ${score.score}/6
    ${score.scorePattern}`

    message.channel.send(returnedScore);
}

module.exports.config = {
    command: "get"
};