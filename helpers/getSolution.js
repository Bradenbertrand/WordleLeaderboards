var fs = require('fs');
var readline = require('readline');

const getSolution = (number) => {
    console.log(number)
    let solution = "";
    let x = 0;
    var filename = 'Solutions.txt';
    readline.createInterface({
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
    return solution
}

module.exports = {
    getSolution: getSolution
}