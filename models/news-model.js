const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  image: { type: String, trim: true, required: true },
  date: { type: Date, default: Date.now() },
  author: { type: String, trim: true, required: true },
  title: { type: String, trim: true, required: true },
  desc: { type: String, trim: true, required: true }
});

const News = mongoose.model("News", schema);
module.exports = News;
