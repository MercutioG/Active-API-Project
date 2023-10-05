// Task blueprint pretty much
const mongoose = require('mongoose');

const User = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 30,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 30
    },
    Email: [{
        type: String,
        required: true,

    }]
});


module.exports = mongoose.model('Users', User);


