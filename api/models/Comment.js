const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

let commentSchema = new Schema({
    email: {
        type: 'string',
        required: 'An email is required.',
        maxlength: 100,
        trim: true
    },
    handle: {
        type: 'string',
        minlength: [2, "Your handle must contain at least 2 characters."],
        maxlength: [50, "Your handle cannot exceed 50 characters."],
        trim: true
    },
    content: {
        type: 'string',
        minlength: [10, "Your comment must contain at least 10 characters."],
        maxlength: [250, "Your comment cannot exceed 250 characters."],
        trim: true
    },
    isReported: {
        type: 'Boolean',
        trim: true
    },
    id_article: {
        type: Schema.Types.ObjectId, 
        ref: 'Article'
    }
}, { timestamps: true });

module.exports = model('Comment', commentSchema);