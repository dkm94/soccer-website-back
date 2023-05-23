const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

let profileSchema = new Schema(
  {
    name: {
      type: "string",
      minlength: [6, "The name must contain at least 2 characters."],
      maxlength: [50, "The name is limited at 50 characters maximum."],
      trim: true,
    },
    handle: {
      type: "string",
      minlength: [2, "The handle must contain at least 2 characters."],
      maxlength: [50, "The handle is limited at 50 characters maximum."],
      trim: true,
    },
    intro: {
      type: "string",
      minlength: [10, "The intro must contain at least 10 characters."],
      maxlength: [150, "The intro is limited at 150 characters maximum."],
      trim: true,
    },
    file: {
      type: "string",
      maxlength: 200,
    },
  },
  { timestamps: true }
);

module.exports = model("Profile", profileSchema);
