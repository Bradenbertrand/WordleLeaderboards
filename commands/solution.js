const axios = require('axios')

module.exports.run = async (bot, message, args) => {
    if (args == "") {
        axios.get('https://wordle-solutions.herokuapp.com/').then(function (solution) {
            console.log(solution)
            message.channel.send("beep bop ba doop doop");
        })
    }
}

module.exports.config = {
    command: "solution"
};