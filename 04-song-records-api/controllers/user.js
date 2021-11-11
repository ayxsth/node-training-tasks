const User = require("../models/user");
const validationHandler = require("../handlers/validation");

const saveUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    try {
        await user.save();
        const token = user.generateToken();
        res.status(201).send({ user, token });
    } catch (e) {
        const error = validationHandler(e);
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const token = user.generateToken();
        res.send({ user, token });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const allowedProperties = ["name", "email", "password"];
        const incomingProperties = Object.keys(req.body);
        const isValid = incomingProperties.every((property) =>
            allowedProperties.includes(property)
        );

        if (!isValid || incomingProperties.length <= 0) {
            return res
                .status(400)
                .send({ error: "Invalid properties provided!" });
        }

        incomingProperties.forEach((property) => {
            req.user[property] = req.body[property];
        });

        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.send(500).send({ error: e.message });
    }
};

const removeUser = async (req, res) => {
    try {
        await req.user.remove();
        res.send(req.user);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

module.exports = {
    saveUser,
    loginUser,
    getUsers,
    updateUser,
    removeUser
};
