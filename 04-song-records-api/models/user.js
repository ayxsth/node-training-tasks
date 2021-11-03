const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name!"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter the email!"],
        lowercase: true,
        trim: true,
        validate(val) {
            if (!isEmail(val)) {
                throw new Error("Please enter a valid email!");
            }
        }
    },
    password: {
        type: String,
        required: [true, "Please enter the password!"],
        minlength: [6, "Minimum password length is 6 characters!"]
    }
});

const User = mongoose.model("User", userSchema);

module.exports = { User };
