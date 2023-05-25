const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

let articleSchema = new Schema(
  {
    title: {
      type: "string",
      required: "A title is required",
      minlength: [6, "The title must contain at least 6 characters"],
      maxlength: [250, "The title is limited at 250 characters maximum"],
      trim: true,
    },
    summary: {
      type: "string",
      minlength: [6, "The summary must contain at least 6 characters"],
      maxlength: [500, "The summary is limited at 500 characters maximum"],
      required: "A summary is required",
      trim: true,
    },
    topic: {
      type: "string",
      required: "A topic is required",
    },
    file: {
      type: "string",
      maxlength: 200,
    },
    caption: {
      type: "string",
      maxlength: [200, "The caption is limited at 200 characters maximum"],
      trim: true,
    },
    content: {
      type: "string",
      maxlength: [
        5000,
        "The article content is limited at 5000 characters maximum",
      ],
      required: "Content is required",
      trim: true,
    },
    online: {
      type: "Boolean",
      required: true,
    },
    featured: {
      type: "Boolean",
      required: true,
    },
    id_profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true }
);

module.exports = model("Article", articleSchema);
