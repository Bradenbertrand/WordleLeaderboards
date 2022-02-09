const Discord = require("discord.js");
require("dotenv").config();
const bot = new Discord.Client();
const mongoose = require('mongoose');
mongoose.connect(process.env.dburl);
const User = require('./models/user');
const fs = require('fs');
const db = mongoose.connection;
bot.commands = new Discord.Collection();
var Roll = require('roll'),
    roll = new Roll();
//If bot fails to load
db.on('error', function (err) {
    console.log('Something went wrong: ' + err);
});
//On bot succesfully on
db.once('open', function () {
    console.log('Connected to mongo database.');
})

//Reads each file in the commands folder.
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    //Removes the .js from the filename
    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        //If there are no commands in the commands folder
        return console.log('No commands found...')
    } else {
        //On success
        console.log(jsfiles.length + ' commands loaded.')
    }
    //Load commands into discord collection
    jsfiles.forEach((f, i) => {
        var cmds = require(`./commands/${f}`);
        bot.commands.set(cmds.config.command, cmds);
    })
})

bot.on('message', message => {
    let prefix = "!wl"
    let sender = message.author;
    let server = message.guild.id;
    //Message content without prefix
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);
    let cmd = bot.commands.get(cont[0]);
    //Check if user has a profile
    checkProfile(sender, server);
    //If the command exists, run the file
    if (message.content.slice(0, 3) == prefix) {
        if (cmd) cmd.run(bot, message, args);
    }
    //If the bot sent the message, do nothing
    if (bot.user.id === message.author.id) { return };
    
});


bot.on('ready', () => {
    console.log('Bot ready...');
    bot.user.setStatus('available')
    bot.user.setPresence({
        game: {
            name: ' Online',
            type: 0,
        }
    });
});


function checkProfile(sender, server) {
    //Creates a new user profile if one does not exist. If it does, adds the server to the users server list if it does not already exist.
    User.findOne({ userId: sender.id }, function (err, record) {
        if (err) {
            console.log(err.stack);
        }
        if (!record) {
            let user = new User();
            user.username = sender.username;
            user.userId = sender.id;
            user.save(function (err) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(sender.username + ' added to the database.');
                }
            })
        } else if (!record.servers.includes(server)) {
            record.servers.push(server)
            record.save(function (error) {
                if (error) {
                    console.log(error)
                } else {
                    console.log("Successfully added server " + server + " to " + record.username + "'s profile");
                }
            });
        }
    })
}

bot.login(process.env.token);