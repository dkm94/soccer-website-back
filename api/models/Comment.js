const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let commentSchema = new Schema({
    email: {
        type: 'string',
        required: 'An email is required.',
        maxlength: 100
    },
    handle: {
        type: 'string',
        minlength: [2, "Your handle must contain at least 2 characters."],
        maxlength: [50, "Your handle cannot exceed 50 characters."]
    },
    content: {
        type: 'string',
        minlength: [10, "Your comment must contain at least 10 characters."],
        maxlength: [250, "Your comment cannot exceed 250 characters."]
    },
    status: {
        type: 'Boolean',
    },
    createdAt: {
        type: new Date(),
        maxlength: 2000
    },
    id_article: {
        type: Schema.Types.ObjectId, 
        ref: 'Article'
    }
});

module.exports = model('Comment', commentSchema);