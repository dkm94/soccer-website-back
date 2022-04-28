const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
let userSchema = new mongoose.Schema({
    email: {
        type: 'string',
        required: 'Your email is required',
        unique: true
    },
    password: {
        type: 'string',
        required: 'The password is required',
        match: [regex, 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial.']
    },
    alias: {
        type: 'string',
        required: 'Please choose an alias'
    },
    competitions: [{
        type: 'Number'
    }]
});

module.exports = mongoose.model('User', userSchema);