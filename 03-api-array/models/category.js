let categories = [
    { id: 1, title: "Biography", createdDate: new Date() },
    { id: 2, title: "History", createdDate: new Date() },
    { id: 3, title: "Sci-Fi", createdDate: new Date() },
    { id: 4, title: "Funny", createdDate: new Date() },
    { id: 5, title: "Story", createdDate: new Date() },
    { id: 6, title: "General Knowledge", createdDate: new Date() }
];

const findIndex = (id) => categories.findIndex((category) => category.id == id);

const findCategory = (id) => categories.find((category) => category.id == id);

module.exports = {
    categories,
    findIndex,
    findCategory
};
