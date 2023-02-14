const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let profileSchema = new Schema({
    name: {
        type: 'string',
        required: 'Your name is required',
        minlength: 6,
        maxlength: 50
    },
    alias: {
        type: 'string',
        unique: true,
        minlength: 2,
        maxlength: 50
    },
    intro: {
        type: 'string',
        minlength: 10,
        maxlength: 50
    },
    picture: {
        type: 'string',
        maxlength: 200
    },
    activated: {
        type: 'Boolean'
    }
});

module.exports = model('Profile', profileSchema);