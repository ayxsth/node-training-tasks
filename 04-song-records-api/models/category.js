const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the category name!"],
        unique: true,
        trim: true
    }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
