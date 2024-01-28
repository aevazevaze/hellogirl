const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    url: {
        type: Number,
        required: true,
        default: 5
    },
    used: {
        type: Number,
        required: true,
        default: 0
    },
    time: {
        type: Number,
        required: true,
    },
    stop: {
        type: String,
        required: false,
        default: "false"
    },
    send: {
        type: String,
        required: false,
        default: "false"
    }
});

module.exports = mongoose.model('UptimePrime', UserSchema)