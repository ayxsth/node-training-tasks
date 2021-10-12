const express = require("express");
const { books, findIndex, findBook, checkProperty } = require("../models/book");
const { findCategory } = require("../models/category");

const router = express.Router();

router.post("/books", (req, res) => {
    try {
        const allowedProperties = ["title", "category", "author"];
        const properties = Object.keys(req.body);
        //check if the provided properties exists in the object
        const isValid = checkProperty(properties, allowedProperties);

        //check the body length and if valid
        if (properties.length !== 3 || !isValid) {
            return res
                .status(400)
                .send({ error: "Invalid or insufficient properties." });
        }

        //find the respective category of the id provided
        const category = findCategory(req.body.category);

        //check if the category exists
        if (!category) {
            return res.status(404).send({ error: "Category not available." });
        }

        //create an object with the provided value
        const book = {
            id: books[books.length - 1].id + 1,
            title: req.body.title,
            category,
            author: req.body.author,
            createdTime: new Date()
        };

        //push the object in the array
        books.push(book);
        res.status(201).send(book);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/books", (req, res) => {
    try {
        //send the array in response
        res.send(books);
    } catch (e) {
        res.status(500).send();
    }
});

router.get("/books/:id", (req, res) => {
    try {
        //find the respective book of the id provided
        const book = findBook(req.params.id);

        //check if the book exists
        if (!book) {
            return res
                .status(404)
                .send({ error: `Book not found with id: ${req.params.id}` });
        }

        //send the book details in response
        res.send(book);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch("/books/:id", (req, res) => {
    try {
        const allowedProperties = ["title", "category", "author"];
        const properties = Object.keys(req.body);
        //check if the provided properties exists in the object
        const isValid = checkProperty(properties, allowedProperties);

        //check the body length and if valid
        if (properties.length !== 3 || !isValid) {
            return res
                .status(400)
                .send({ error: "Invalid or insufficient properties." });
        }

        //get the book's index of provided id
        const index = findIndex(req.params.id);

        //check if the book exists
        if (index < 0) {
            return res
                .status(404)
                .send({ error: `Book not found with id: ${req.params.id}` });
        }

        //get the category of provided id
        const category = findCategory(req.body.category);

        //check if the category exists
        if (!category) {
            return res.status(404).send({ error: "Category not available." });
        }

        //update the value of that index by provided value
        books[index].title = req.body.title;
        books[index].category = category;
        books[index].author = req.body.author;
        res.send(books[index]);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete("/books/:id", (req, res) => {
    try {
        //find book's index of the provided id
        const index = findIndex(req.params.id);

        //check if the book exists
        if (index < 0) {
            return res
                .status(404)
                .send({ error: `Book not found with id: ${req.params.id}` });
        }

        //remove the books from the array
        const deletedBook = books.splice(index, 1)[0];
        res.send(deletedBook);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
