const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Song = require("./song");

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

userSchema.virtual("songs", {
    ref: "Song",
    localField: "_id",
    foreignField: "owner"
});

userSchema.methods.generateToken = function () {
    const user = this;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 24 * 60 * 60
    });
    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password!");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid email or password!");
    }

    return user;
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
};

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password")) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
    }

    next();
});

userSchema.pre("remove", async function (next) {
    const user = this;
    await Song.deleteMany({ owner: user._id });
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
