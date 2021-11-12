const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the song name!"]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please enter the category!"]
    }
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
