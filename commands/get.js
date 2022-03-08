const Score = require('../models/score');
module.exports.run = async (bot, message, args) => {
    let userId = message.author.id.slice(0, 10);
    let scoreid = args;
    let scores = Score.find({});
    console.log(scores);
}

module.exports.config = {
    command: "get"
};