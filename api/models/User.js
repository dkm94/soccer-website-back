const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const regex = /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
let userSchema = new Schema({
    email: {
        type: 'string',
        required: 'Your email is required',
        unique: true,
        maxlength: 200
    },
    password: {
        type: 'string',
        required: 'The password is required',
        match: [regex, 'Le mot de passe doit contenir au moins 6 caractères, une majuscule, un nombre et caractère spécial.'],
        maxlength: 64
    },
    admin: {
        type: 'Boolean',
        required: "Chose a status for mod"
    },
    id_profile: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile'
    }
});

module.exports = model('User', userSchema);