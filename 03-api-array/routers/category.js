const express = require("express");
const { categories, findIndex } = require("../models/category");
const router = express.Router();

router.post("/categories", (req, res) => {
    const bodyKeys = Object.keys(req.body);

    if (!(bodyKeys.length === 1 && bodyKeys[0] === "title")) {
        return res
            .status(400)
            .send({ error: "Only title is required to add a category." });
    }

    const category = {
        id: categories.length + 1,
        title: req.body.title,
        createdDate: new Date()
    };

    categories.push(category);
    res.status(201).send(category);
});

router.get("/categories", (req, res) => {
    res.send(categories);
});

router.get("/categories/:id", (req, res) => {
    const category = categories.find(
        (category) => category.id == req.params.id
    );

    if (!category) {
        return res
            .status(404)
            .send({ error: `Category not found with id: ${req.params.id}` });
    }

    res.send(category);
});

router.patch("/categories/:id", (req, res) => {
    const bodyKeys = Object.keys(req.body);

    if (!(bodyKeys.length === 1 && bodyKeys[0] === "title")) {
        return res
            .status(400)
            .send({ error: "Only title is required to add a category." });
    }

    const index = findIndex(req.params.id);

    if (index < 0) {
        return res
            .status(404)
            .send({ error: `Category not found with id: ${req.params.id}` });
    }

    categories[index].title = req.body.title;
    res.send(categories[index]);
});

router.delete("/categories/:id", (req, res) => {
    const index = findIndex(req.params.id);

    if (index < 0) {
        return res
            .status(404)
            .send({ error: `Category not found with id: ${req.params.id}` });
    }

    const category = categories.splice(index, 1);
    res.send(category);
});

module.exports = router;
