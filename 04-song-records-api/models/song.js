const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({});

const Song = mongoose.model("Song", songSchema);

module.exports = { Song };
