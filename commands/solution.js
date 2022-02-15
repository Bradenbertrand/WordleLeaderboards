const axios = require('axios')

module.exports.run = async (bot, message, args) => {
    const date = new Date();
    const todaysDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`
    if (args == "") {
        axios.get(`https://wordle-solutions.herokuapp.com/`).then(function (solution) {
            console.log(solution.todaysDate)
            message.channel.send(solution.todaysDate);
        })
    }
}

module.exports.config = {
    command: "solution"
};