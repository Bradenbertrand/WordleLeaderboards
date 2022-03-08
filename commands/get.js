const Score = require('../models/score');
module.exports.run = async (bot, message, args) => {
    let userId = message.author.id.slice(0, 10);
    let scoreid = args;
    let scores = await Score.find({});
    console.log(scores.length);
}

module.exports.config = {
    command: "get"
};