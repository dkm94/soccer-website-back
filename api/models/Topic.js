const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

let topicSchema = new Schema(
  {
    name: {
      required: true,
      type: "string",
    },
  }
);

module.exports = model("Topic", topicSchema);
