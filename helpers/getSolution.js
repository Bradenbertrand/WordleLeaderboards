var fs = require('fs');
var readline = require('readline');

const getSolution = async (number) => {
    console.log("number fed to getSolution: " + number[0])
    let solution = "";
    let x = 0;
    var filename = 'Solutions.txt';
    await readline.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    }).on('line', function(line) {
        x += 1;
        if (x == (parseInt(number[0]) + 3)) { 
            var lineDeconstruct = line.split(" ")
            console.log("wordle number: " + lineDeconstruct[4])
            console.log("solution: " + lineDeconstruct[5])
            solution = lineDeconstruct[5]
        }
        
    })
    console.log("returned solution: " + solution)
    return solution
}

module.exports = {
    getSolution: getSolution
}