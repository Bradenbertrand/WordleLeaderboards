let mongoose = require('mongoose');

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
    }, date: {
        default: new Date(),
        required: true
    }
});

let Score = module.exports = mongoose.model('Score', scoreSchema);