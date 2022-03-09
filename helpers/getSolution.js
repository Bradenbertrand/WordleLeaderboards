var fs = require('fs');
var readline = require('readline');

const getSolution = async (number) => {
    console.log("number fed to getSolution: " + number[0])
    let x = 0;
    var filename = 'Solutions.txt';
    const solution = await readline.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    }).on('line', function(line) {
        x += 1;
        if (x == (parseInt(number[0]) + 3)) { 
            var lineDeconstruct = line.split(" ")
            console.log("wordle number: " + lineDeconstruct[4])
            console.log("solution: " + lineDeconstruct[5])
            const resolvedSolution = lineDeconstruct[5]
            return resolvedSolution
        }
        
    })
    return solution
}

module.exports = {
    getSolution: getSolution
}