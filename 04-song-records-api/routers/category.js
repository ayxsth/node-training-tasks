const { Router } = require("express");
const {
    saveCategory,
    getCategories,
    updateCategory,
    removeCategory
} = require("../controllers/category");

const router = Router();

router.post("/categories", saveCategory);

router.get("/categories", getCategories);

router.patch("/categories/:id", updateCategory);

router.delete("/categories/:id", removeCategory);

module.exports = router;
