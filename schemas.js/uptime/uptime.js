const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: "Uptimed"
    },
    stop: {
        type: String,
        required: false,
        default: "false"
    }
});

module.exports = mongoose.model('Uptime', UserSchema)