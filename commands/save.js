module.exports.run = async (bot, message, args) => {
    let regex = /Wordle \d\d\d \d\/6/i;
    if (regex.test(message.content)) {
        message.channel.send("valid wordle score")
        
    } else {
        message.channe.send("Invalid")
    }
}

module.exports.config = {
    command: "save"
}