const { findCategory } = require("./category");

let books = [
    {
        id: 1,
        title: "The First World War",
        description: "This is the history of world ward",
        category: findCategory(2),
        author: "Hew Strachan",
        createdDate: new Date()
    }
];

const findIndex = (id) => books.findIndex((book) => book.id == id);

const findBook = (id) => books.find((book) => book.id == id);

const checkProperty = (properties, allowedProperties) =>
    properties.every((property) => allowedProperties.includes(property));

module.exports = {
    books,
    findIndex,
    findBook,
    checkProperty
};
