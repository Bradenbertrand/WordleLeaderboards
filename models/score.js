let mongoose = require('mongoose');

var todayDate = new Date();

let scoreSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    wordleNumber: {
        type: Number,
        required: true
    },
    scoreId: {
        type: String,
        required: true
    },
    scorePattern: {
        type: String,
    },
    serverId: {
        type: String,
        required: true
    }, 
    date: {
        type: Date,
        default: `${todayDate.getFullYear()}-${todayDate.getMonth()}-${todayDate.getDate() + 1}`
    }
});

let Score = module.exports = mongoose.model('Score', scoreSchema);