const Category = require("../models/category");
const validationHandler = require("../handlers/validation");

const saveCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = await Category.create({ name });
        res.status(201).send(category);
    } catch (e) {
        const error = validationHandler(e);
        res.status(400).send(error);
    }
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidator: true
            }
        );

        if (!category) {
            return res.status(404).send({ error: "Category not found!" });
        }

        res.send(category);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

const removeCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).send({ error: "Category not found" });
        }

        res.send(category);
    } catch (e) {
        res.status(500).send({ error: e.message });
    }
};

module.exports = {
    saveCategory,
    getCategories,
    updateCategory,
    removeCategory
};
