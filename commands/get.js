const Score = require('../models/score');
var fs = require('fs');
var readline = require('readline');

module.exports.run = async (bot, message, args) => {
    console.log("Get has been run")
    let userid = message.author.id.slice(0, 10);
    let scoreid = args;
    let scores = await Score.find({});
    let x = 0;
    var filename = 'Solutions.txt';
    var resolvedSolution = "";

    let sortedArray = scores.filter(function (score) {
        return score.userId.slice(0,10) == userid
    }).filter(function (score) {
        return score.wordleNumber == scoreid
    })


    var rl = readline.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    })


    rl.on('line', function(line) {
        x += 1;
        if (x == (parseInt(args[0]) + 3)) { 
            var lineDeconstruct = line.split(" ")
            console.log("wordle number: " + lineDeconstruct[4])
            console.log("solution: " + lineDeconstruct[5])
            resolvedSolution = lineDeconstruct[5]
            if (sortedArray.length == 0) {
                message.channel.send("No score found. Could be that you didn't play this day, or the number you entered was invalid.")
            } else {
                if (!resolvedSolution) {
                    console.log("Solution not found")
                    resolvedSolution = "solution not found"
                }
                message.channel.send(`Wordle ${scoreid} ${sortedArray[0].score}/6 ${sortedArray[0].scorePattern}
                \nsolution: ||${resolvedSolution}||`)
            }
        }
    })

}

module.exports.config = {
    command: "get"
};
