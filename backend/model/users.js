const mongoose = require('mongoose');

const user = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    role: {type: String, enum: ['admin', 'farmer', 'consumer'], default: 'consumer'}
});

const Users = mongoose.model("Users", user);

module.exports = Users;



