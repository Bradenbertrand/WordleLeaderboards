var fs = require('fs');
var readline = require('readline');

const getSolution = (number) => {
    let solution = "";
    var filename = '../Solutions.txt';
    readline.createInterface({
        input: fs.createReadStream(filename),
        terminal: false
    }).on('line', function(line) {
        var lineDeconstruct = line.split(" ")
        if (parseInt(lineDeconstruct[4]) - 2 == parseInt(number)) {
            solution = lineDeconstruct[5]
        }
    })
    return solution
}

module.exports = {
    getSolution: getSolution
}