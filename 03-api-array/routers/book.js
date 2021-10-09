const express = require("express");
const router = express.Router();
const { books, findIndex, findBook, checkProperty } = require("../models/book");
const { findCategory } = require("../models/category");

router.post("/books", (req, res) => {
    const allowedProperties = ["title", "category", "author"];
    const properties = Object.keys(req.body);
    const isValid = checkProperty(properties, allowedProperties);

    if (properties.length !== 3 || !isValid) {
        return res
            .status(400)
            .send({ error: "Invalid or insufficient properties." });
    }

    const category = findCategory(req.body.category);

    if (!category) {
        return res.status(404).send({ error: "Category not available." });
    }

    const book = {
        id: books.length + 1,
        title: req.body.title,
        category,
        author: req.body.author,
        createdTime: new Date()
    };

    books.push(book);
    res.status(201).send(book);
});

router.get("/books", (req, res) => {
    res.send(books);
});

router.get("/books/:id", (req, res) => {
    const book = findBook(req.params.id);

    if (!book) {
        return res
            .status(404)
            .send({ error: `Book not found with id: ${req.params.id}` });
    }

    res.send(book);
});

router.patch("/books/:id", (req, res) => {
    const allowedProperties = ["title", "category", "author"];
    const properties = Object.keys(req.body);
    const isValid = checkProperty(properties, allowedProperties);

    if (properties.length !== 3 || !isValid) {
        return res
            .status(400)
            .send({ error: "Invalid or insufficient properties." });
    }

    const index = findIndex(req.params.id);

    if (index < 0) {
        return res
            .status(404)
            .send({ error: `Book not found with id: ${req.params.id}` });
    }

    const category = findCategory(req.body.category);

    if (!category) {
        return res.status(404).send({ error: "Category not available." });
    }

    books[index].title = req.body.title;
    books[index].category = category;
    books[index].author = req.body.author;
    res.send(books[index]);
});

router.delete("/books/:id", (req, res) => {
    const index = findIndex(req.params.id);

    if (index < 0) {
        return res
            .status(404)
            .send({ error: `Book not found with id: ${req.params.id}` });
    }

    const deletedBook = books.splice(index, 1)[0];
    res.send(deletedBook);
});

module.exports = router;
