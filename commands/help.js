module.exports.run = async(bot, message, args) => {
    message.channel.send(`Commands:
    !wlhelp - this command
    !wlsave <Pasted Wordle Score> - add your Wordle score 
    !wltop - See the top 5 players on this server
    !wltop all - see the top 5 players on all servers
    !wltop avg - See the top 5 player averages on this server
    !wltop avg all - See the top 5 player averages on all servers
    !wltopall - See the top 5 players on all servers
    !wlavg - See your average score
    !wlpoints - See your current points
    !wlwins - See your wins, losses, and win rate`)
}

module.exports.config = {
    command: "help"
}