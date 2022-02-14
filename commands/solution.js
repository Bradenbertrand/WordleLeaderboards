const axios = require('axios')

module.exports.run = async (bot, message, args) => {
    if (args == "") {
        axios.get('https://wordle-solutions.herokuapp.com/').then(function (solution) {
            const solutionParsed = JSON.parse(solution)
            message.channel.send(solutionParsed);
        })
    }
}

module.exports.config = {
    command: "solution"
};