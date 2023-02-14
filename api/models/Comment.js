const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let commentSchema = new Schema({
    email: {
        type: 'string',
        required: 'An email is required',
        maxlength: 100
    },
    alias: {
        type: 'string',
        minlength: 2,
        maxlength: 50
    },
    content: {
        type: 'string',
        minlength: 10,
        maxlength: 250
    },
    status: {
        type: 'Boolean',
    },
    
});

module.exports = model('Comment', commentSchema);