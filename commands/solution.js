const axios = require('axios')

module.exports.run = async (bot, message, args) => {
    const date = new Date();
    if (args == "") {
        axios.get(`https://wordle-solutions.herokuapp.com/2022-${date.getMonth()}-${date.getDay()}}`).then(function (solution) {
            console.log(solution)
            console.log
            message.channel.send("beep bop ba doop doop");
        })
    }
}

module.exports.config = {
    command: "solution"
};