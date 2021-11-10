const { Router } = require("express");
const {
    saveCategory,
    getCategories,
    updateCategory,
    removeCategory
} = require("../controllers/category");
const auth = require("../middleware/auth");

const router = Router();

router.post("/categories", auth, saveCategory);

router.get("/categories", auth, getCategories);

router.patch("/categories/:id", auth, updateCategory);

router.delete("/categories/:id", auth, removeCategory);

module.exports = router;
