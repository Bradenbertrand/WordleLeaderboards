let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true
    },
    scoreAvg: {
        type: Number,
        default: 0,
        required: true
    },
    runningTotal: {
        type: Number,
        default: 0,
        required: true
    },
    gamesPlayed: {
        type: Number,
        default: 0,
        required: true
    },
    servers: {
        type: Array,
        default: [],
        required: true
    },
    points: {
        type: Number,
        default: 0,
        required: true
    }
});

let User = module.exports = mongoose.model('User', userSchema);
