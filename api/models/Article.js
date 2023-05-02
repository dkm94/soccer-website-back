const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

let articleSchema = new Schema(
  {
    title: {
      type: "string",
      required: "A title is required",
      minlength: [6, "The title must contain at least 6 characters."],
      maxlength: [100, "The title is limited at 100 characters maximum."],
      trim: true,
    },
    summary: {
      type: "string",
      maxlength: [
        200,
        "The introduction is limited at 200 characters maximum.",
      ],
      trim: true,
    },
    topic: {
      type: "string",
      required: true,
    },
    file: {
      type: "string",
      maxlength: 200,
    },
    caption: {
      type: "string",
      maxlength: [150, "The caption is limited at 150 characters maximum."],
      trim: true,
    },
    content: {
      type: "string",
      maxlength: [
        2000,
        "The article content is limited at 2000 characters maximum.",
      ],
      trim: true,
    },
    online: {
      type: "Boolean",
      required: true,
    },
    id_profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    id_topic: {
      type: Schema.Types.ObjectId,
      ref: "Topic",
    },
  },
  { timestamps: true }
);

module.exports = model("Article", articleSchema);
