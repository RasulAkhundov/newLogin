const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    image: { type: String, trim: true, required: true },
    ad: { type: String, trim: true, required: true },
    tecrube: { type: String, trim: true, required: true },
    tarix: { type: Date, default: Date.now() },
    maas: { type: Number, trim: true, required: true }
})

const jobs = mongoose.model("jobs", schema);
module.exports = jobs;