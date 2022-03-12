var fs = require('fs');
var readline = require('readline');

module.exports.run = async (bot, message, args) => {
    let scoreid = args
    let filename = "Solutions.txt"
    let x = 0;
    var resolvedSolution = "";
    console.log('getsolution run')
    var rl = readline.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    })
    console.log("interface created")
    rl.on('line', function(line) {
        x += 1;
        if (x == parseInt(args[0] + 3)) {
            console.log("line found")
            var lineDeconstruct = line.split(" ")
            console.log("wordle number: " + lineDeconstruct[4])
            console.log("solution: " + lineDeconstruct[5])
            resolvedSolution = lineDeconstruct[5]
            if (!resolvedResolution) {
                console.log("Solution not found")
                message.channel.send("Solution not found")
            } else {
                message.channel.send(`Wordle ${scoreid} solution: ||${resolvedSolution}||`)
            }
        }
    })
}

module.exports.config = {
    command: "solution"
};