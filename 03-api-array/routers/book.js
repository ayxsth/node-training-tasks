const express = require("express");
const controller = require("../controllers/book");

const router = express.Router();

router.post("/books", controller.saveBook);

router.get("/books", controller.getBooks);

router.get("/books/:id", controller.getBookById);

router.patch("/books/:id", controller.updateBook);

router.delete("/books/:id", controller.deleteBook);

module.exports = router;
