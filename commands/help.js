module.exports.run = async(bot, message, args) => {
    message.channel.send("Commands:\n!wlhelp - this command\n!wlsave <Pasted Wordle Score> - add your Wordle score \n!wltop - See the top 5 players!\n!wlavg - See your average score")
}

module.exports.config = {
    command: "help"
}