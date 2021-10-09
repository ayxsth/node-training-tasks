const express = require("express");
const { categories, findIndex, findCategory } = require("../models/category");
const router = express.Router();

router.post("/categories", (req, res) => {
    //get the keys from body
    const bodyKeys = Object.keys(req.body);

    //check if the keys' length is 1 and name is title
    if (!(bodyKeys.length === 1 && bodyKeys[0] === "title")) {
        return res
            .status(400)
            .send({ error: "Only title is required to add a category." });
    }

    //create an object with the provided title to add in the categories array
    const category = {
        id: categories.length + 1,
        title: req.body.title,
        createdDate: new Date()
    };

    //push the object in the array and send the response
    categories.push(category);
    res.status(201).send(category);
});

router.get("/categories", (req, res) => {
    //send the categories array in response
    res.send(categories);
});

router.get("/categories/:id", (req, res) => {
    //get the category using the provided id
    const category = findCategory(req.params.id);

    //check if the category with the provided id exists
    if (!category) {
        return res
            .status(404)
            .send({ error: `Category not found with id: ${req.params.id}` });
    }

    //send the category in response
    res.send(category);
});

router.patch("/categories/:id", (req, res) => {
    //get the keys from body
    const bodyKeys = Object.keys(req.body);

    //check if the keys' length is 1 and name is title
    if (!(bodyKeys.length === 1 && bodyKeys[0] === "title")) {
        return res
            .status(400)
            .send({ error: "Only title is required to add a category." });
    }

    //get the index of the provided id
    const index = findIndex(req.params.id);

    //check of the index exist
    if (index < 0) {
        return res
            .status(404)
            .send({ error: `Category not found with id: ${req.params.id}` });
    }

    //update the title and send it through response
    categories[index].title = req.body.title;
    res.send(categories[index]);
});

router.delete("/categories/:id", (req, res) => {
    //get the index of the provided id
    const index = findIndex(req.params.id);

    //check of the index exist
    if (index < 0) {
        return res
            .status(404)
            .send({ error: `Category not found with id: ${req.params.id}` });
    }

    //delete the object from the array and return it
    const deletedCategories = categories.splice(index, 1);
    res.send(deletedCategories[0]);
});

module.exports = router;
