const Song = require("../models/song");
const Category = require("../models/category");
const validationHandler = require("../handlers/validation");

const saveSong = async (req, res) => {
    const { name, category } = req.body;

    try {
        if (!(await Category.findById(category))) {
            return res.status(404).send({ error: "Category not found!" });
        }

        const song = await Song.create({ name, owner: req.user._id, category });
        res.status(201).send(song);
    } catch (e) {
        const error = validationHandler(e);
        res.status(400).send(error);
    }
};

const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.send(songs);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const updateSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);

        if (!song) {
            return res.status(404).send({ error: "Song not found!" });
        }

        if (song.owner.toString() != req.user._id.toString()) {
            return res.status(403).send({ error: "Update not allowed!" });
        }

        const allowedProperties = ["name", "category"];
        const incomingProperties = Object.keys(req.body);
        const isValid = incomingProperties.every((property) =>
            allowedProperties.includes(property)
        );

        if (incomingProperties.length <= 0 || !isValid) {
            return res
                .status(400)
                .send({ error: "Invalid properties provided!" });
        }

        incomingProperties.forEach((property) => {
            song[property] = req.body[property];
        });

        if (!(await Category.findById(song.category))) {
            return res.status(404).send({ error: "Category not found!" });
        }

        await song.save();
        res.send(song);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const removeSong = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);

        if (!song) {
            return res.status(404).send({ error: "Song not found!" });
        }

        if (song.owner.toString() !== req.user._id.toString()) {
            return res.status(403).send({ error: "Delete not allowed!" });
        }

        await song.remove();
        res.send(song);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

module.exports = {
    saveSong,
    getSongs,
    updateSong,
    removeSong
};
