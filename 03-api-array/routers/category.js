const express = require("express");
const controller = require("../controllers/category");

const router = express.Router();

router.post("/categories", controller.saveCategory);

router.get("/categories", controller.getCategories);

router.get("/categories/:id", controller.getCategoryById);

router.patch("/categories/:id", controller.updateCategory);

router.delete("/categories/:id", controller.deleteCategory);

module.exports = router;
