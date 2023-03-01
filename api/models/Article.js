const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let articleSchema = new Schema({
    title: {
        type: 'string',
        required: 'A title is required',
        minlength: [6, "The title must contain at least 6 characters."],
        maxlength: [100, "The title is limited at 100 characters maximum."]
    },
    author: {
        type: 'string',
        required: 'The author of the article is required',
        minlength: [2, "The author's name must contain at least 2 characters."],
        maxlength: [50, "The author's name is limited at 50 characters maximum."]
    },
    img: {
        type: 'string',
        maxlength: 200
    },
    img_caption: {
        type: 'string',
        maxlength: [150, "The caption is limited at 150 characters maximum."]
    },
    introduction: {
        type: 'string',
        maxlength: [200, "The introduction is limited at 200 characters maximum."]
    },
    content: {
        type: 'string',
        maxlength: [2000, "The article content is limited at 2000 characters maximum."]
    },
    createdAt: {
        type: new Date(),
    },
    id_profile: {
        type: Schema.Types.ObjectId, 
        ref: 'Profile'
    }
});

module.exports = model('Article', articleSchema);