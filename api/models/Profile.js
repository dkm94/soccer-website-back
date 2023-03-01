const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let profileSchema = new Schema({
    name: {
        type: 'string',
        minlength: [6, "The name must contain at least 2 characters."],
        maxlength: [50, "The name is limited at 50 characters maximum."]
    },
    handle: {
        type: 'string',
        minlength: [2, "The handle must contain at least 2 characters."],
        maxlength: [50, "The handle is limited at 50 characters maximum."]
    },
    intro: {
        type: 'string',
        minlength: [10, "The intro must contain at least 10 characters."],
        maxlength: [50, "The intro is limited at 50 characters maximum."]
    },
    // picture: {
    //     type: 'string',
    //     maxlength: 200
    // },
    isActive: { // admin can deactivate mod profile
        type: 'Boolean',
        required: true
    }
});

module.exports = model('Profile', profileSchema);