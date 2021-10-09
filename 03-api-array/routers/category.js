const express = require("express");
const { categories, findIndex, findCategory } = require("../models/category");

const router = express.Router();

router.post("/categories", (req, res) => {
    try {
        //get the keys from body
        const bodyKeys = Object.keys(req.body);

        //check if the keys' length is 1 and name is title
        if (bodyKeys.length !== 1 || bodyKeys[0] !== "title") {
            return res
                .status(400)
                .send({ error: "Invalid or insufficient properties." });
        }

        //create an object with the provided title to add in the categories array
        const category = {
            id: categories[categories.length - 1].id + 1,
            title: req.body.title,
            createdDate: new Date()
        };

        //push the object in the array and send the response
        categories.push(category);
        res.status(201).send(category);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/categories", (req, res) => {
    try {
        //send the categories array in response
        res.send(categories);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/categories/:id", (req, res) => {
    try {
        //get the category using the provided id
        const category = findCategory(req.params.id);

        //check if the category with the provided id exists
        if (!category) {
            return res.status(404).send({
                error: `Category not found with id: ${req.params.id}`
            });
        }

        //send the category in response
        res.send(category);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch("/categories/:id", (req, res) => {
    try {
        //get the keys from body
        const bodyKeys = Object.keys(req.body);

        //check if the keys' length is 1 and name is title
        if (bodyKeys.length !== 1 || bodyKeys[0] !== "title") {
            return res
                .status(400)
                .send({ error: "Invalid or insufficient properties." });
        }

        //get the index of the provided id
        const index = findIndex(req.params.id);

        //check of the index exist
        if (index < 0) {
            return res.status(404).send({
                error: `Category not found with id: ${req.params.id}`
            });
        }

        //update the title and send it through response
        categories[index].title = req.body.title;
        res.send(categories[index]);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/categories/:id", (req, res) => {
    try {
        //get the index of the provided id
        const index = findIndex(req.params.id);

        //check of the index exist
        if (index < 0) {
            return res.status(404).send({
                error: `Category not found with id: ${req.params.id}`
            });
        }

        //delete the object from the array and return it
        const deletedCategory = categories.splice(index, 1)[0];
        res.send(deletedCategory);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
