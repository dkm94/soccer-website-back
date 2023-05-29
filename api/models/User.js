const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let userSchema = new Schema({
    email: {
        type: 'string',
        required: 'Your email is required.',
        unique: "Email already exists.",
        maxlength: 100,
        trim: true
    },
    password: {
        type: 'string',
        // required: 'The password is required.',
        minlength: [6, "The password must contains at least 6 characters."],
        maxlength: [60, "The password cannot exceed 60 characters."],
        trim: true
    },
    isAdmin: {
        type: 'Boolean',
        required: "Please choose a status."
    },
    isMod: {
        type: 'Boolean',
        required: "Please choose a status."
    },
    accountValidated: { // set to true when (1st) login
        type: 'Boolean',
        required: true
    },
    id_profile: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile'
    }
}, { timestamps: true });

module.exports = model('User', userSchema);