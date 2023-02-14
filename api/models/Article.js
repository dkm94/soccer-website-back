const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let articleSchema = new Schema({
    title: {
        type: 'string',
        required: 'A title is required',
        minlength: 6,
        maxlength: 100
    },
    author: {
        type: 'string',
        required: 'The author of the article is required',
        minlength: 2,
        maxlength: 50
    },
    img: {
        type: 'string',
        maxlength: 200
    },
    img_caption: {
        type: 'string',
        maxlength: 150
    },
    introduction: {
        type: 'string',
        maxlength: 200
    },
    content: {
        type: 'string',
        maxlength: 2000
    },
    createdAt: {
        type: new Date(),
        maxlength: 2000
    },
});

module.exports = model('Article', articleSchema);